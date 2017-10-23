import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from './router/index.js'
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux'
import store from './store/index.js';
ReactDOM.render(<Provider store={store}>
    <Router />
</Provider>, document.getElementById('root'));
registerServiceWorker();
