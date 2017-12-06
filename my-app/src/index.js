import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';
import Router from './router/index.js'
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import store from './store/index.js';
if (module.hot) {
  // 模块自己就接收更新
  module.hot.accept();
}
React.Component.prototype.$http = axios
ReactDOM.render(<Provider store={store}>
    <Router />
</Provider>, document.getElementById('root'));
registerServiceWorker();
