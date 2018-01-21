import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';

import { Grid, Navbar, Nav, NavItem } from 'react-bootstrap';

import { CharsBlock, CharProfileBlock } from './contentBlocks';
import {LoktarLoading} from './basicComponents';

import ChatWindow from "./chatWindow";

import About from "./about";


import LandingPage from "./landing"
import CharsPage from "./charsPage"
import Footer from "./footer"


class ContentManager extends Component {
  constructor(props) {
    super(props)
    this.contentMapper = {
      Login: () => {return <LandingPage login={this.props.login} />},
      CharsBlock: () => {return <CharsPage logout={this.props.logout} profile={this.props.profile} />},
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

login = () => {
    console.log("Landing Login", this.state.url)
    window.location.assign(this.state.url)
  }

logout = () => {
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
      return (null)
    }
    return (
    <nav className="navbar navbar-inverse">
        <div className="container">
            <div className="navbar-header"><a className="navbar-brand" href="#"><strong><em>T</em>eam #SoloQueue</strong></a><button className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navcol-1"><span className="sr-only">Toggle navigation</span><span className="icon-bar"></span><span className="icon-bar"></span><span className="icon-bar"></span></button></div>
            <div
                className="collapse navbar-collapse" id="navcol-1">
                <ul className="nav navbar-nav navbar-left">
                    <li role="presentation"><a role="button" onClick={() => this.setState({screen: 'CharsBlock'})}> Heroes </a></li>
                    <li role="presentation"><a role="button" onClick={() => this.setState({screen: 'ChatWindow'})}> Arena Chats</a></li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                    <li role="presentation"><a role="button" onClick={() => this.logout}><strong><em>Logout</em></strong></a></li>
                </ul>
        </div>
        </div>
    </nav>
    )
  }

  showProfile(uuid) {
    console.log("Show Profile")
    this.setState({screen: 'CharProfile', uuid: uuid});
  }

  render() {
    console.log("Screen", this.state.screen, "Loading", this.state.isLoading);

    return (
      <div>
      <this.WNavBar />
      <ContentManager login={this.login} logout={this.logout} state={this.state} profile={this.showProfile}/>
      <Footer />
      </div>

    );
  }
}

export default App;