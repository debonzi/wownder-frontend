import React from 'react';


class Footer extends React.Component {
	render() {
		return(
	    <div className="footer-dark">
	        <footer>
	            <div className="container">
	                <div className="row">
	                    <div className="col-md-6 col-md-push-6 item text">
	                        <h3>Daniel Debonzi</h3>
	                        <p>All work here is done for free and for you. Thanks for using it.</p>
	                    </div>
	                    <div className="col-md-3 col-md-pull-6 col-sm-4 item">
	                        <h3>Colaborators </h3>
	                        <ul>
	                            <li><a href="#">Stoopz </a></li>
	                        </ul>
	                    </div>
	                    <div className="col-md-3 col-md-pull-6 col-sm-4 item">
	                        <h3>Source Code</h3>
	                        <ul>
	                            <li><a href="#">Application Server</a></li>
	                            <li><a href="#">Frontend App</a></li>
	                        </ul>
	                    </div>
	                    <div className="col-md-12 col-sm-4 item social"><a href="#"><i className="icon ion-social-facebook"></i></a><a href="#"><i className="icon ion-social-twitter"></i></a><a href="#"><i className="icon ion-social-snapchat"></i></a><a href="#"><i className="icon ion-social-instagram"></i></a></div>
	                </div>
	                <p className="copyright">Debonzi.com © 2018</p>
	            </div>
	        </footer>
	    </div>
    )
	}
}

export default Footer