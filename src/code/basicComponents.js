import React from 'react';

class CharPortrait extends React.Component {
  handleClick = () => {
    this.props.onCharClick(this.props.uuid);
  }

  render()
  {
    return (
      <div role="button" onClick={this.handleClick} uuid={this.props.uuid} className="col-xs-6 col-sm-4 col-md-3">
        <div className="thumbnail">
          <img src={this.props.inset} alt="" />
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

    this.state = {value: ''};
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  } 

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.role) {
      this.setState({value: nextProps.profile.role})
    }
  }

  is_checked(role) {
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
      listed_2s: false,
      listed_3s: false};

    this.handleChange = this.handleChange.bind(this);

  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.checked})
  }

  componentWillReceiveProps(nextProps) {
    this.setState({listed_2s: nextProps.profile.listed_2s})
    this.setState({listed_3s: nextProps.profile.listed_3s})
  }

  render() {
    return (
      <form>
        <label>
          Let people find me:
        </label>
        <div className="checkbox">
          <label><input type="checkbox" name="listed_2s" onChange={this.handleChange} checked={this.state.listed_2s}/>List me for 2s</label>
        </div>
        <div className="checkbox">
          <label><input type="checkbox" name="listed_3s" onChange={this.handleChange}  checked={this.state.listed_3s} />List me for 3s</label>
        </div>
      </form>
    );
  }
}



export {CharPortrait, RoleForm, ListedForm}
