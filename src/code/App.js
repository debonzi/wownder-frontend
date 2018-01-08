import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';

import { Grid, Navbar, Nav, NavItem } from 'react-bootstrap';

import { CharsBlock, CharProfileBlock, Login } from './contentBlocks';
import {LoktarLoading} from './basicComponents';
import ChatWindow from "./chatWindow";
import About from "./about";


class ContentManager extends Component {
  constructor(props) {
    super(props)
    this.contentMapper = {
      Login: () => {return <Login login_url={this.props.state.url} />},
      CharsBlock: () => {return <CharsBlock profile={this.props.profile} />},
      CharProfile: () => {return <CharProfileBlock  uuid={this.props.state.uuid} />},
      ChatWindow: () => {return <ChatWindow />},
      About: () => {return <About />}
    }
  }
  render() {
    console.log('state', this.props.state)
    return this.contentMapper[this.props.state.screen]()
  }
}


class App extends Component {
  constructor(props) {
    super(props)
    this.showProfile = this.showProfile.bind(this)
    this.logout = this.logout.bind(this)
    this.WNavBar = this.WNavBar.bind(this)

    this.state = {
      screen: 'Login',
      isLoading: true
    }
  }

  componentDidMount() {
    let endpoint = process.env.REACT_APP_API_URI + '/api'
    fetch(endpoint, {credentials: 'include'})
    .then(results => {
      if (results.status === 401){
        return results.json()
      }
      return {screen: 'CharsBlock'};
    }).then((data) => {
      console.log("Data", data)
    this.setState(data);
    this.setState({isLoading: false})
    })
  }

  logout() {
    let endpoint = process.env.REACT_APP_API_URI + '/api/logout'
    fetch(endpoint, {credentials: 'include'})
    .then(results => {
      return results.json();
    }).then(data => {
      console.log("Logout", data);
      // window.location.assign("https://www.w3schools.com")
      window.location.reload()
    })
  }

  WNavBar() {
    if (this.state.screen === "Login") {
      return (
      <Nav pullRight>
        <NavItem eventKey={1} onClick={() => window.location.assign(this.state.url)}>Login</NavItem>
      </Nav>

      )
    }
    return (
      <div>
      <Nav>
        <NavItem eventKey={1} onClick={() => this.setState({screen: 'CharsBlock'})}>Chars</NavItem>
      </Nav>
      <Nav>
        <NavItem eventKey={2} onClick={() => this.setState({screen: 'ChatWindow'})}>Messages</NavItem>
      </Nav>
      <Nav pullRight>
          <li></li>
        <NavItem eventKey={3} onClick={() => this.setState({screen: 'About'})}>About</NavItem>
        <NavItem eventKey={4} onClick={this.logout}>Logout</NavItem>
      </Nav>
      </div>
    )
  }

  showProfile(uuid) {
    this.setState({screen: 'CharProfile', uuid: uuid});
  }

  render() {
    console.log("Screen", this.state.screen, "Loading", this.state.isLoading);

    return (
      <div>
        <LoktarLoading isLoading={this.state.isLoading} />
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              Wownder
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
          <this.WNavBar />
          </Navbar.Collapse>
        </Navbar>
        <Grid>
          <ContentManager state={this.state} profile={this.showProfile}/>
        </Grid>
      <ToastContainer autoClose={2000}/>
      </div>
    );
  }
}

export default App;