import React, { Component } from 'react';
import { Grid, Navbar, Nav, NavItem, Jumbotron, Button } from 'react-bootstrap';


class CharGrid extends Component {
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
              profile={this.props.profile}
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


class CharProfile extends Component {
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
            <img class="side-bar-thumb" src={this.state.char.thumbnail_url}/>
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
                Current 3v3 Rating: <span class="main-char-stats-highlight"> {this.state.char.s2_cr} </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )}
}


class ProfileChooserHandler extends Component {
  handleClick = () => {
    console.log("UUID", this.props.uuid)
    this.props.onCharClick(this.props.uuid);
  }

  render() {
    return (
      <h3 onClick={this.handleClick}>
        {this.props.name}
      </h3>
    );
  }
}

class CharPortrait extends Component {
  render()
  {
    return (
      <div class="col-xs-6 col-sm-4 col-md-3">
        <div class="thumbnail">
          <img src={this.props.inset} />
          <div class="caption">
            <ProfileChooserHandler onCharClick={this.props.profile} uuid={this.props.uuid} name={this.props.name} />
            <h5>({this.props.level} {this.props.class}, {this.props.realm})</h5>
            <ul class="main-char-stats">
              <li>Current 2v2 Rating: <span class="main-char-stats-highlight"> {this.props.s2_cr} </span></li>
              <li>Current 3v3 Rating: <span class="main-char-stats-highlight"> {this.props.s3_cr} </span></li>
            </ul>
            <p />
          </div>
        </div>
      </div>
    )
  }
}


class ContentManager extends Component {
  render() {
    if (this.props.state.screen === 'char_grid'){
      return <CharGrid  profile={this.props.profile} />
    }
    else if (this.props.state.screen === 'char_profile'){
      return <CharProfile uuid={this.props.state.uuid} />
    }
  }
}


class App extends Component {
  constructor(props) {
    super(props)
    this.showProfile = this.showProfile.bind(this)
    this.state = {
      screen: 'char_grid'
    }
  }

  showProfile(uuid) {
    this.setState({screen: 'char_profile', uuid: uuid});
    console.log("showProfile", uuid)
  }

  render() {
    return (
      <div>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand />
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} href="#" onClick={() => this.setState({screen: 'char_grid'})}>Chars</NavItem>
            </Nav>
          </Navbar.Collapse>          
        </Navbar>
        <Jumbotron>
          <Grid>
            <ContentManager state={this.state} profile={this.showProfile}/>
          </Grid>
        </Jumbotron>
      </div>
    );
  }
}

export default App;