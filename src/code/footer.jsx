import React from 'react';


class Footer extends React.Component {
	render() {
		return(
	    <div className="footer-dark">
	        <footer>
	            <div className="container">
	                <div className="row">
	                    <div className="col-md-6 col-md-push-6 item text">
	                        <h3>Mechanical Programmer</h3>
	                        <p>All work here is done for free and for you. Thanks for using it.</p>
	                    </div>
	                    <div className="col-md-3 col-md-pull-6 col-sm-4 item">
	                        <h3>Colaborators </h3>
	                        <ul>
	                            <li>
	                                <strong><a href="http://www.stoopzz.com"> Stoopz </a></strong>
				                    <div className="col-md-12 col-sm-4 item social">
				                        <a href="https://twitter.com/Stoopzz_TV">
				                            <i className="icon ion-social-twitter"></i>
				                        </a>
				                        <a href="https://www.youtube.com/channel/UChGcWDcAbCoRvCc3vaW1m2A">
				                            <i className="icon ion-social-youtube"></i>
				                        </a>
				                        <a href="https://www.twitch.tv/stoopzz_tvhttps://www.twitch.tv/stoopzz_tv">
					                        <i className="icon ion-social-twitch"></i>
				                        </a>
			                        </div>

	                            </li>
	                        </ul>
	                    </div>
	                    <div className="col-md-3 col-md-pull-6 col-sm-4 item">
	                        <h3>Source Code</h3>
	                        <ul>
	                            <li><a href="#">Application Server</a></li>
	                            <li><a href="#">Frontend App</a></li>
	                        </ul>
	                    </div>
	                </div>
	                <p className="copyright">Development and Maintainance by Debonzi.com © 2018</p>
	            </div>
	        </footer>
	    </div>
    )
	}
}

export default Footer