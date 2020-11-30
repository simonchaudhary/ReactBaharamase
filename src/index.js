import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import * as serviceWorker from './serviceWorker';


//Device token class
import DeviceToken from "./utilities/Device_token"

ReactDOM.render( <
    React.StrictMode >
    <
    DeviceToken / > { /* <App /> */ } <
    /React.StrictMode>,
    document.getElementById('root')
);
// serviceWorker.unregister();
reportWebVitals();