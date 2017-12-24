import React, { Component } from 'react';
import { Grid, Navbar, Nav, NavItem, Jumbotron } from 'react-bootstrap';

import { CharsBlock, CharProfileBlock } from './contentBlocks'


class ContentManager extends Component {
  render() {
    if (this.props.state.screen === 'CharsBlock'){
      return <CharsBlock  profile={this.props.profile} />
    }
    else if (this.props.state.screen === 'CharProfile'){
      return <CharProfileBlock uuid={this.props.state.uuid} />
    }
  }
}


class App extends Component {
  constructor(props) {
    super(props)
    this.showProfile = this.showProfile.bind(this)
    this.state = {
      screen: 'CharsBlock'
    }
  }

  showProfile(uuid) {
    this.setState({screen: 'CharProfile', uuid: uuid});
  }

  render() {
    return (
      <div>
        <Grid>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
            Wownder
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} href="#" onClick={() => this.setState({screen: 'CharsBlock'})}>Chars</NavItem>
            </Nav>
          </Navbar.Collapse>          
        </Navbar>
        <Jumbotron>
            <ContentManager state={this.state} profile={this.showProfile}/>
        </Jumbotron>
          </Grid>
      </div>
    );
  }
}

export default App;