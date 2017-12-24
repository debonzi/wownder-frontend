import React from 'react';

class CharPortrait extends React.Component {
  handleClick = () => {
    console.log("UUID", this.props.uuid)
    this.props.onCharClick(this.props.uuid);
  }

  render()
  {
    return (
      <div role="button" onClick={this.handleClick} uuid={this.props.uuid} class="col-xs-6 col-sm-4 col-md-3">
        <div class="thumbnail">
          <img src={this.props.inset} alt="" />
          <div class="caption">
            <h3>{this.props.name} </h3>
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

export default CharPortrait
