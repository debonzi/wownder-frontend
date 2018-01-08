import React from 'react'
import { Jumbotron } from 'react-bootstrap';

class About extends React.Component {
	render () {
		return(
			<Jumbotron>
			<h3>
			  Hey there!! Nice to have you here.<br/>
		    </h3>
			<h4><strong>Status:</strong></h4>
			  <ul>
				  <li>
				    This is a personal project in a very early stage of development and use. It is expected to have some bugs and missing features during this fase.
				  </li>
				  <li>
				    I will keep most information regarding this project like next steps and known issues here so check on it once in a while to stay tunned ;)
				  </li>
			  </ul>
			<h4><strong>Next Project Steps:</strong></h4>
			  <ul>
			    <li>Code improvements on client-side (ReactJS) and server-side (Python-Flask) projects.</li>
			    <li>Make both projects open source on github</li>
			  </ul>
			<h4><strong>Known Issues:</strong></h4>
			  <ul>
			    <li>Messages window does not behave correctly on mobiles or smallscreens.</li>
			  </ul>
			</Jumbotron>
			)
	}
}

export default About
