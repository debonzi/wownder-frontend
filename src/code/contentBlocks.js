import React, { Component } from 'react';

import {CharPortrait, RoleForm, ListedForm, Find2s, Find3s, Results} from './basicComponents'


class CharsBlock extends Component {
  constructor(props){
    super(props);
    this.state = {chars: []}
  }

  componentDidMount() {
    let endpoint = process.env.REACT_APP_API_URI + '/api/chars'
    fetch(endpoint, {credentials: 'include'})
    .then(results => {
      return results.json();
    }).then(data => {
      let chars = data.map((char) => {
        return(
          <CharPortrait
              key={char.uuid}
              onCharClick={this.props.profile}
              uuid={char.uuid}
              inset={char.inset_url}
              name={char.name}
              level={char.level}
              className={char.class}
              realm={char.realm}
              s2_cr={char.s2_cr}
              s3_cr={char.s3_cr}
          />
        )
      })
    this.setState({chars: chars});
    })
  }

  render() {
    return (
    <div className="row">
    {this.state.chars}
    </div>
    )
  }
}


class CharProfileBlock extends Component {
  constructor(props){
    super(props);
    this.state = {char: {}, profile: {}, results: []}

    this.handleProfileChange = this.handleProfileChange.bind(this);
    this.handleResultsUpdated = this.handleResultsUpdated.bind(this);
  }

  componentDidMount() {
    let c_endpoint = process.env.REACT_APP_API_URI + '/api/chars/' + this.props.uuid
    fetch(c_endpoint, {credentials: 'include'})
    .then(results => {
      return results.json();
    }).then(data => {
      this.setState({char: data});
    })

    let p_endpoint = process.env.REACT_APP_API_URI + '/api/chars/' + this.props.uuid + '/profile'
    fetch(p_endpoint, {credentials: 'include'})
    .then(results => {
      if (results.status === 404){
        return {}
      }
      return results.json();
    }).then(data => {
      this.setState({profile: data});
    })
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

  render() {
    return(
    <div className="panel panel-default">
      <div className="panel-body">
        <div className="row">
          <div className="col-xs-3 col-md-2">
            <img className="side-bar-thumb" src={this.state.char.thumbnail_url} alt=""/>
          </div>
          <div className="col-xs-9 col-md-10">
            <strong>
              {this.state.char.name} ({this.state.char.level} {this.state.char.c_class}, <span>{this.state.char.realm})</span>
            </strong>
            <div className="row">
              <div className="col-xs-6 col-md-6">
                Current 2v2 Rating: <span className="main-char-stats-highlight"> {this.state.char.s2_cr} </span>
              </div>
              <div className="col-xs-6 col-md-6">
                Current 3v3 Rating: <span className="main-char-stats-highlight"> {this.state.char.s3_cr} </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xs-6 col-md-6">
          <RoleForm profile={this.state.profile}/>
        </div>
        <div className="col-xs-6 col-md-6">
          <ListedForm profile={this.state.profile} profileHandler={this.handleProfileChange}/>
        </div>

        <div className="col-xs-6 col-md-6">
          <Find2s profile={this.state.profile} resultsUpdated={this.handleResultsUpdated}/>
        </div>
        <div className="col-xs-6 col-md-6">
          <Find3s profile={this.state.profile} resultsUpdated={this.handleResultsUpdated}/>
        </div>



      </div>
    <Results results={this.state.results} />
    </div>
  )}
}

class Login extends Component {
  render(){
    return(
    <div>
      <a className="btn" href={this.props.login_url}>
        <img alt="Brand" src={process.env.REACT_APP_API_URI + "/static/css-imgs/wow-nav-logo.png"} width="300px" />
        <h3>Login</h3>
      </a>
    </div>
  )}
}

export  { CharsBlock, CharProfileBlock, Login }