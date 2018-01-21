import React from 'react';

class LandingPage extends React.Component {
	login = () => {
		this.props.login()
	}

	render() {
		return(
	    <div className="container" id="welcome">
	        <div className="jumbotron">
	            <h1 className="text-center" id="landing_title">Team #SoloQueue</h1>
	            <h2>Hero of Azeroth!!</h2>
	            <p>Are you here to fight?</p>
	            <p className="text-justify">If you are eager to step your foot into the arena but can no longer stand the infinite wait finding a proper warrior to fight along side you. If you are ready to fight again after thousands of foes defeated into the Arena. If you want to be
	                recognized as the true master of the arena or just have some fun smashing your enemies. You come to the right place.</p>
	            <p className="text-justify">Lets band together and fight our way to the top. No more waiting. The Battle Starts Now!!</p>
	            <div className="bnlogin-container">
				<button className="bnlogin-dark-black" onClick={this.login}>
				    <img src={require('../media/battlenet_button_t.png')} width="46px" alt="" />
				    <span> Login to Battle.net </span>
				</button>
				</div>
	        </div>
	    </div>
    )
	}
}

export default LandingPage