import React, { Component } from 'react';
import { Grid, Navbar, Jumbotron, Button } from 'react-bootstrap';


class CharGrid extends Component {
  constructor(props){
    super(props);
    this.state = {chars: []}
  }

  componentDidMount() {
    fetch('http://localhost:5000/api/chars', {credentials: 'include'})
    .then(results => {
      return results.json();
    }).then(data => {
      let chars = data.map((char) => {
        return(
          <CharPortrait 
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
    console.log("Chars", this.state.chars)
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

class CharPortrait extends Component {
  render()
  {
    return (
      <div class="col-xs-6 col-sm-4 col-md-3">
        <div class="thumbnail">
          <img src={this.props.inset} />
          <div class="caption">
            <h3>{this.props.name}</h3>
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

class App extends Component {

  // componentDidMount() {
  //   console.log("DEbonzi");
  //   fetch('http://localhost:5000/chars/api', {credentials: 'include'})
  //   .then(results => {
  //     console.log(results.json());
  //   })
  // }

  render() {
    return (
      <div>
        <Navbar inverse fixedTop>
          <Grid>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/">React App</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
          </Grid>
        </Navbar>
        <Jumbotron>
          <Grid>
            <h1>Welcome to React</h1>
            <CharGrid />
          </Grid>
        </Jumbotron>
      </div>
    );
  }
}

export default App;