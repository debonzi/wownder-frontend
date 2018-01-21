import React from 'react';
import { toast } from 'react-toastify';

 import { css } from 'glamor';

function customToast(message) {
	toast(message, {
      className: css({
      	color: 'rgb(255, 255, 255)',
        backgroundColor: 'rgba(52,36,20,0.90)'
      }),
      progressClassName: css({
          background: 'rgb(0, 0, 0)'
      }),
      autoClose: 2500
    });
}

class ArenaBrackets extends React.Component {
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
        customToast("Listing option saved!");
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
	    <div className="panel panel-default panel-config">
	        <div className="panel-heading panel-heading-config">
	            <h3 className="panel-title">Brackets </h3>
	        </div>
	        <div className="panel-body">
	            <div className="checkbox">
		            <label>
			            <input type="checkbox" name="listed_2s" onChange={this.handleChange} checked={this.state.profile.listed_2s} />
				            Arenas 2x2
		            </label>
	            </div>
	            <div className="checkbox">
		            <label>
			            <input type="checkbox" name="listed_3s" onChange={this.handleChange}  checked={this.state.profile.listed_3s} />
			            Arenas 3x3
		            </label>
	            </div>
	        </div>
	    </div>
  )

  }
}


class ArenaRole extends React.Component {
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
        customToast("New role " + data.role + " saved!");
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
        <div className="panel panel-default panel-config">
            <div className="panel-heading panel-heading-config">
                <h3 className="panel-title">Role </h3>
            </div>
            <div className="panel-body">
                <div className="radio">
                	<label>
                		<input type="radio" name="role" value="DPS" onChange={this.handleChange} checked={this.is_checked('DPS')} />
                		DPS
            		</label>
        		</div>
                <div className="radio">
	                <label>
		                <input type="radio" name="role" value="Healer" onChange={this.handleChange} checked={this.is_checked('Healer')} />
		                Healer
	                </label>
                </div>
            </div>
        </div>
  	)
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
        customToast("Wow!! No matches found.");
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
      <div className="col-md-6 col-sm-12 col-xs-12">
        <button onClick={this.findChars} className={this.props.profile.listed_2s ? "btn-find": "btn-find disabled"} >
		    <span> Find 2x2 </span>
		</button>
      </div>
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
        customToast("Wow!! No matches found.");
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
      <div className="col-md-6 col-sm-12 col-xs-12">
        <button onClick={this.findChars} className={this.props.profile.listed_3s ? "btn-find": "btn-find disabled"}>
		    <span> Find 3x3 </span>
		</button>
      </div>
    );
  }
}


class ResultPortrait extends React.Component {
  createChatRoom = () => {
    console.log('Create Chat', this.props.char.uuid)
    let endpoint = process.env.REACT_APP_API_URI + '/api/chars/' + this.props.seeker.uuid + '/chat/rooms'
    fetch(endpoint, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({'recipient_uuid': this.props.char.uuid})
    }).then(results => {
      if (results.status === 201){
        customToast("Chat Room Created");
        customToast("Access Using Arena Chats on Navigation Bar");
      }
    }

    )

  }

  render() {
  	return(
	    <div className="col-md-3 col-sm-4 col-xs-6" role="button">
	        <div className="thumbnail portrait"><img src={this.props.char.inset_url} className="portrait" alt="" />
	            <div className="caption portrait-name text-center">}
	                <h3 className="text-center portrait-name" style={{margin: 0}}><strong><em>{this.props.char.name}</em></strong> </h3>
	                <h4 className="text-center portrait-name" style={{margin: 0}}><em>({this.props.char.realm})</em></h4>
	                <ul className="list-unstyled portrait">
	                    <li>Rating 2x2: <strong>{this.props.char.s2_cr}</strong></li>
	                    <li>Rating 3x3: <strong>{this.props.char.s3_cr}</strong></li>
	                    <li>Role: <strong>{this.props.char.profile.role}</strong></li>
	                </ul>
	                <button className="btn-add-chat" onClick={this.createChatRoom}>
					    Create Room
					</button>
	            </div>
	        </div>
	    </div>
  	)
  }
}

class Results extends React.Component {
  render() {
    console.log("Results render", this.props.results);
    console.log("Result render Seeker", this.props.seeker)
    let _results = this.props.results.map((res) => {
      return(
        <ResultPortrait key={res.uuid} seeker={this.props.seeker} char={res} />
        )
      })
    return _results
    }
}



class SearchPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    	char: {}, 
    	profile: {}, 
    	results: [], 
    	isLoading: false, 
    	fetchedChar:false, 
    	fetchedProfile: false,
	    viewport: {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        }
    }

    this.handleProfileChange = this.handleProfileChange.bind(this);
    this.handleResultsUpdated = this.handleResultsUpdated.bind(this);
    this.setLoadingStatus = this.setLoadingStatus.bind(this);
  }

    _resize_mixin_callback = () => {
        this.setState({
            viewport: {
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight
            }
        })
    }

  componentDidMount() {
  	window.addEventListener('resize', this._resize_mixin_callback);
    this.setState({isLoading: true});
    let c_endpoint = process.env.REACT_APP_API_URI + '/api/chars/' + this.props.uuid
    fetch(c_endpoint, {credentials: 'include'})
    .then(results => {
      return results.json();
    }).then(data => {
      console.log("on Fetch Char => Fetched Profile", this.state.fetchedProfile)
      this.setState({char: data, fetchedChar: true, isLoading: !(this.state.fetchedProfile)});
    })

    let p_endpoint = process.env.REACT_APP_API_URI + '/api/chars/' + this.props.uuid + '/profile'
    fetch(p_endpoint, {credentials: 'include'})
    .then(results => {
      if (results.status === 404){
        return {}
      }
      return results.json();
    }).then(data => {
      console.log("on Fetch Char => Fetched Profile", this.state.fetchedChar)
      this.setState({profile: data, fetchedProfile: true, isLoading: !(this.state.fetchedChar)});
    })
  }

  componentWillUnmount(){
        window.removeEventListener('resize', this._resize_mixin_callback);
  }

  handleProfileChange(key, value) {
    let _p = this.state.profile
    _p[key] = value;
    this.setState({profile: _p});
  }

  handleResultsUpdated(results){
    console.log("Updated Main", results)
    this.setState({results: results})
  }

  setLoadingStatus(state) {
    console.log("setLoadingStatus", state)
    this.setState({isLoading: state})
  }


  customStyles = () => {
  	  if (this.state.viewport.width < 992) {
  	  	return {"backgroundImage": null}
  	  }
	  return {"backgroundImage": "url(" + this.state.char.profile_url + ")"}
  }


	render() {
		return(
    	<div className="container logged">
	        <div className="row row-char-config row-char-config-bg" style={this.customStyles()}>
	            <div className="col-md-3 col-sm-6 col-xs-6">
	                <div className="thumbnail portrait-config"><img src={this.state.char.inset_url} className="portrait" alt="" />
	                    <div className="caption portrait-name">
	                        <h3 className="text-center portrait-name"><strong><em>{this.state.char.name}</em></strong> </h3>
	                        <ul className="list-unstyled portrait">
	                            <li>Rating 2x2: <strong>{this.state.char.s2_cr}</strong></li>
	                            <li>Rating 3x3: <strong>{this.state.char.s3_cr}</strong></li>
	                        </ul>
	                        <h4 className="text-center portrait-name"><em>({this.state.char.realm})</em></h4>
	                    </div>
	                </div>
	            </div>
	            <div className="col-md-3"></div>
	            <div className="col-md-3"></div>
	            <div className="col-md-3 col-sm-6 col-xs-6">
	        		<ArenaRole profile={this.state.profile} />
	                <ArenaBrackets profile={this.state.profile} profileHandler={this.handleProfileChange}/>
	                <div className="row .btn-find-container">
	                    <Find2s setLoadingStatus={this.setLoadingStatus} profile={this.state.profile} resultsUpdated={this.handleResultsUpdated}/>
	                    <Find3s setLoadingStatus={this.setLoadingStatus} profile={this.state.profile} resultsUpdated={this.handleResultsUpdated}/>
	                </div>
	            </div>
	        </div>
	        <div className="row">
	        	<Results seeker={this.state.char} results={this.state.results} />
	        </div>
        </div>
        )
	}
}

export default SearchPage