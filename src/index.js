import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './code/App';
import registerServiceWorker from './code/registerServiceWorker';


import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import './css/ionicons.min.css'

import './css/custom.css'
import './css/landing.css'
import './css/logged.css'
import './css/Footer-Dark.css'


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
