import React, { Component } from 'react';

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
        <ErrorBoundary>
            <ContentManager state={this.state} profile={this.showProfile}/>
        </ErrorBoundary>
        </Jumbotron>
          </Grid>
      </div>
    );
  }
}

export default App;