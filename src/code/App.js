import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';

import { Grid, Navbar, Nav, NavItem, Jumbotron } from 'react-bootstrap';

import { CharsBlock, CharProfileBlock, Login } from './contentBlocks'


class ContentManager extends Component {
  render() {
    console.log('state', this.props.state)
    if (this.props.state.screen === 'CharsBlock'){
      return <CharsBlock  profile={this.props.profile} />
    }
    else if (this.props.state.screen === 'CharProfile'){
      return <CharProfileBlock uuid={this.props.state.uuid} />
    }
    else if (this.props.state.screen === 'Login'){
      return <Login login_url={this.props.state.url} />
    }
    return ""
  }
}


class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // componentDidCatch(error, info) {
  //   // Display fallback UI
  //   this.setState({ hasError: true });
  //   // You can also log the error to an error reporting service
  //   logErrorToMyService(error, info);
  // }
  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}


class App extends Component {
  constructor(props) {
    super(props)
    this.showProfile = this.showProfile.bind(this)
    this.logout = this.logout.bind(this);
    this.WNavBar = this.WNavBar.bind(this);

    this.state = {
      screen: 'Login'
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
    })
  }

  logout() {
    let endpoint = process.env.REACT_APP_API_URI + '/api/logout'
    fetch(endpoint, {credentials: 'include'})
    .then(results => {
      return results.json();
    }).then(data => {
      console.log("Logout", data);
      window.location.reload()
    })
  }

  WNavBar() {
    if (this.state.screen === "Login") {
      return ""
      // (
      // <Nav pullRight>
      //   <NavItem eventKey={1} href={this.state.url}>Login</NavItem>
      // </Nav>

      // )
    }
    return (
      <div>
      <Nav>
        <NavItem eventKey={1} href="#" onClick={() => this.setState({screen: 'CharsBlock'})}>Chars</NavItem>
      </Nav>
      <Nav pullRight>
        <NavItem eventKey={2} href="#" onClick={this.logout}>Logout</NavItem>
      </Nav>
      </div>
    )
  }

  showProfile(uuid) {
    this.setState({screen: 'CharProfile', uuid: uuid});
  }

  render() {
    return (
      <div>
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
        <Jumbotron>
        <ErrorBoundary>
            <ContentManager state={this.state} profile={this.showProfile}/>
        </ErrorBoundary>
        </Jumbotron>
        </Grid>
      <ToastContainer autoClose={2000}/>
      </div>
    );
  }
}

export default App;