import React, { Component } from 'react';

import CharPortrait from './basicComponents'


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
              onCharClick={this.props.profile}
              uuid={char.uuid}  
              inset={char.inset_url}
              name={char.name}
              level={char.level}
              class={char.class}
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
    <div class="row">
    {this.state.chars}
    </div>
    )
  }
}


class CharProfileBlock extends Component {
  constructor(props){
    super(props);
    this.state = {char: {}}
  }

  componentDidMount() {
    let endpoint = process.env.REACT_APP_API_URI + '/api/chars/' + this.props.uuid
    fetch(endpoint, {credentials: 'include'})
    .then(results => {
      return results.json();
    }).then(data => {
      this.setState({char: data});
    })
  }


  render() {
    return(
    <div class="panel panel-default">
      <div class="panel-body">
        <div class="row">
          <div class="col-xs-3 col-md-2">
            <img class="side-bar-thumb" src={this.state.char.thumbnail_url} alt=""/>
          </div>
          <div class="col-xs-9 col-md-10">
            <strong>
              {this.state.char.name} ({this.state.char.level} {this.state.char.c_class}, <span>{this.state.char.realm})</span>
            </strong>
            <div class="row">
              <div class="col-xs-6 col-md-6">
                Current 2v2 Rating: <span class="main-char-stats-highlight"> {this.state.char.s2_cr} </span>
              </div>
              <div class="col-xs-6 col-md-6">
                Current 3v3 Rating: <span class="main-char-stats-highlight"> {this.state.char.s3_cr} </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )}
}

export  { CharsBlock, CharProfileBlock }