import React from 'react';


class CharPortrait extends React.Component {
  handleClick = () => {
    this.props.onCharClick(this.props.uuid);
  }

  render()
  {
    return (
	    <div className="col-md-3 col-sm-4 col-xs-6" role="button" onClick={() => this.props.onCharClick(this.props.uuid)}>
	        <div className="thumbnail portrait"><img src={this.props.inset} className="portrait" />
	            <div className="caption portrait-name">
	                <h3 className="text-center portrait-name"><strong><em>{this.props.name}</em></strong> </h3>
	                <ul className="list-unstyled portrait">
	                    <li>Rating 2x2: <strong>{this.props.s2_cr}</strong></li>
	                    <li>Rating 3x3: <strong>{this.props.s3_cr}</strong></li>
	                </ul>
	                <h4 className="text-center portrait-name"><em>({this.props.realm})</em></h4>
	            </div>
	        </div>
	    </div>
    )
  }
}


class CharsGroup extends React.Component {
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
    this.state.chars
    )
  }

}


class CharsPage extends React.Component {
	render() {
		return(
	<div>
    <div className="container logged">
        <div className="row">
        	<CharsGroup profile={this.props.profile}/>
        </div>
    </div>
    </div>
			)
	}
}

export default CharsPage