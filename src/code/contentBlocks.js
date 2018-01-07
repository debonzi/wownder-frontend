import React, { Component } from 'react';

import {LoktarLoading, CharPortrait, RoleForm, ListedForm, Find2s, Find3s, Results} from './basicComponents'
import { Jumbotron } from 'react-bootstrap';


class CharsBlock extends Component {
  constructor(props){
    super(props);
    this.state = {chars: [], isLoading: false}
  }

  componentDidMount() {
    this.setState({isLoading: true});
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
    this.setState({isLoading: false});
    })
  }

  render() {
    return (
    <div className="row">
    <LoktarLoading isLoading={this.state.isLoading} />
    {this.state.chars}
    </div>
    )
  }
}


class CharProfileBlock extends Component {
  constructor(props){
    super(props);
    this.state = {char: {}, profile: {}, results: [], isLoading: false, fetchedChar:false, fetchedProfile: false}

    this.handleProfileChange = this.handleProfileChange.bind(this);
    this.handleResultsUpdated = this.handleResultsUpdated.bind(this);
    this.setLoadingStatus = this.setLoadingStatus.bind(this);
  }

  componentDidMount() {
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

  render() {
    console.log('Prof Block', this.state.char)
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
          <Find2s setLoadingStatus={this.setLoadingStatus} profile={this.state.profile} resultsUpdated={this.handleResultsUpdated}/>
        </div>
        <div className="col-xs-6 col-md-6">
          <Find3s setLoadingStatus={this.setLoadingStatus} profile={this.state.profile} resultsUpdated={this.handleResultsUpdated}/>
        </div>
      </div>
    <Results seeker={this.state.char} results={this.state.results} />
    <LoktarLoading isLoading={this.state.isLoading} />
    </div>
  )}
}

class Login extends Component {
  render(){
    return(
    <div>
    <Jumbotron>
      <img src={require('../media/landing_battle.jpg')} style={{ display: "block", margin:"0 auto" }} alt="Logo"/>
    </Jumbotron>
    </div>
  )}
}

export  { CharsBlock, CharProfileBlock, Login }