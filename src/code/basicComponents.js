import React from 'react';
import { toast } from 'react-toastify';

import Modal from 'react-modal';


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    color                 : 'black',
  },
  overlay: {
    backgroundColor: 'black',
    opacity: 0.5
  }
};

class LoktarLoading extends React.Component {

  render() {
    return (
    <Modal
      isOpen={this.props.isLoading}
      style={customStyles}
      ariaHideApp={false}
    >
      <h1>Lok'tar Ogar!!!</h1>
      <p>Loading....</p>
    </Modal>
  )}
}

class CharPortrait extends React.Component {
  handleClick = () => {
    this.props.onCharClick(this.props.uuid);
  }

  render()
  {
    return (
      <div role="button" onClick={this.handleClick} uuid={this.props.uuid} className="col-xs-6 col-sm-4 col-md-3">
        <div className="thumbnail thumbnail-top-margin">
          <img className="thumbnail-top-margin" src={this.props.inset} alt="" />
          <div className="caption">
            <h3>{this.props.name} </h3>
            <h5>({this.props.level} {this.props.class}, {this.props.realm})</h5>
            <ul className="main-char-stats">
              <li>Current 2v2 Rating: <span className="main-char-stats-highlight"> {this.props.s2_cr} </span></li>
              <li>Current 3v3 Rating: <span className="main-char-stats-highlight"> {this.props.s3_cr} </span></li>
            </ul>
            <p />
          </div>
        </div>
      </div>
    )
  }
}


class RoleForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.is_checked = this.is_checked.bind(this);
    this.serverUpdate = this.serverUpdate.bind(this);

    this.state = {value: ''};
  }

  serverUpdate(role) {
    let endpoint = process.env.REACT_APP_API_URI + '/api/chars/' + this.props.profile.char_uuid + '/profile'
    fetch(endpoint, {
      credentials: 'include',
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({'role': role})
    }).then(results => {
      return results.json()
    }).then((data) => {
        toast.info("New role " + data.role + " saved!");
    })
    console.log("PUT", {'role': role})
  }

  handleChange(event) {
    this.setState({value: event.target.value});
    this.serverUpdate(event.target.value);
  } 

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.role && this.state.value === '') {
      this.setState({value: nextProps.profile.role})
    }
  }

  is_checked(role) {
    console.log("On Check", this.state.value)
    return this.state.value === role;
    }

  render() {
    return (
      <form>
        <label>
          Role:
          <div className="radio">
            <label><input type="radio" name="role" value="DPS" onChange={this.handleChange} checked={this.is_checked('DPS')}/> DPS </label>
          </div>
          <div className="radio">
            <label><input type="radio" name="role" value="Healer" onChange={this.handleChange} checked={this.is_checked('Healer')}/> Healer </label>
          </div>
        </label>
      </form>
    );
  }
}


class ListedForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.serverUpdate = this.serverUpdate.bind(this);
  }

  serverUpdate(data) {
    let endpoint = process.env.REACT_APP_API_URI + '/api/chars/' + this.props.profile.char_uuid + '/profile'
    fetch(endpoint, {
      credentials: 'include',
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }).then(results => {
      return results.json();
    }).then((data) => {
        toast.info("Listing option saved!");
    })
    console.log("PUT", data)
  }

  handleChange(event) {
    this.serverUpdate({[event.target.name]: event.target.checked});
    this.props.profileHandler(event.target.name, event.target.checked);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({profile: nextProps.profile})
  }

  render() {
    return (
      <form>
        <label>
          Let people find me:
        </label>
        <div className="checkbox">
          <label><input type="checkbox" name="listed_2s" onChange={this.handleChange} checked={this.state.profile.listed_2s}/>List me for 2s</label>
        </div>
        <div className="checkbox">
          <label><input type="checkbox" name="listed_3s" onChange={this.handleChange}  checked={this.state.profile.listed_3s} />List me for 3s</label>
        </div>
      </form>
    );
  }
}


class Find2s extends React.Component {
  constructor(props) {
    super(props);
    this.state = {profile: {}, results: []};

    this.findChars = this.findChars.bind(this);
  }

  findChars() {
    if (!this.props.profile.listed_2s) {
      return;
    }
    this.props.setLoadingStatus(true);
    console.log("Find 2s");
    let endpoint = process.env.REACT_APP_API_URI + '/api/chars/' + this.props.profile.char_uuid + '/profile/matches?arena=2s'
    fetch(endpoint, {credentials: 'include'})
    .then(results => {
      return results.json();
    }).then(data => {
      if (data.length === 0) {
        toast.info("Wow!! No matches found.");
      }
      this.setState({results: data})
      this.props.resultsUpdated(data)
      this.props.setLoadingStatus(false);
      console.log("Find2s", data);
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({profile: nextProps.listed_2s})
  }

  render() {
    return (
      <button type="button" onClick={this.findChars} className={this.props.profile.listed_2s ? "btn btn-primary": "btn btn-primary disabled"}> Find 2s</button>
    );
  }
}

class Find3s extends React.Component {
  constructor(props) {
    super(props);
    this.state = {profile: {}, results: []};

    this.findChars = this.findChars.bind(this);
  }

  findChars() {
    if (!this.props.profile.listed_3s) {
      return;
    }
    this.props.setLoadingStatus(true);
    console.log("Find 3s");
    let endpoint = process.env.REACT_APP_API_URI + '/api/chars/' + this.props.profile.char_uuid + '/profile/matches?arena=3s'
    fetch(endpoint, {credentials: 'include'})
    .then(results => {
      return results.json();
    }).then(data => {
      if (data.length === 0) {
        toast.info("Wow!! No matches found.");
      }
      this.setState({results: data})
      this.props.resultsUpdated(data);
      this.props.setLoadingStatus(false);
      console.log("Find3s", data);
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({profile: nextProps.listed_3s})
  }

  render() {
    return (
      <button type="button" onClick={this.findChars} className={this.props.profile.listed_3s ? "btn btn-primary": "btn btn-primary disabled"}> Find 3s</button>
    );
  }
}


class ResultWidget extends React.Component {
  render() {
    return(
    <div className="panel panel-default">
      <div className="panel-body">
        <div className="row">
          <div className="col-xs-3 col-md-2">
            <img className="side-bar-thumb" src={this.props.char.thumbnail_url} alt=""/>
          </div>
          <div className="col-xs-9 col-md-10">
            <strong>
              {this.props.char.name} ({this.props.char.level} {this.props.char.c_class}, <span>{this.props.char.realm})</span>
            </strong>
            <div className="row">
              <div className="col-xs-6 col-md-6">
                Current 2v2 Rating: <span className="main-char-stats-highlight"> {this.props.char.s2_cr} </span>
              </div>
              <div className="col-xs-6 col-md-6">
                Current 3v3 Rating: <span className="main-char-stats-highlight"> {this.props.char.s3_cr} </span>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-6 col-md-6">
                Role: <span className="main-char-stats-highlight"> {this.props.char.profile.role} </span>
              </div>
              <div className="col-xs-6 col-md-6">
                In Game Chat Command: <span className="main-char-stats-highlight"> <pre>/t {this.props.char.name}-{this.props.char.realm}</pre> </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )}
}


class Results extends React.Component {
  render() {
    console.log("Resuts render", this.props.results);
    let _results = this.props.results.map((res) => {
      return(
        <ResultWidget key={res.uuid} char={res} />
        )
      })
    return _results
    }
}

export {LoktarLoading, CharPortrait, RoleForm, ListedForm, Find2s, Find3s, Results}


