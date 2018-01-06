import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';
import Router from './router/index.js'
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import store from './store/index.js';
import {updateStaff,updateDept} from './global/initBaseData.js';
if (module.hot) {
  // 模块自己就接收更新
  module.hot.accept();
}
React.Component.prototype.$http = axios;
// 取得部门数据和员工的数据
updateStaff.bind(React.Component.prototype)();
updateDept.bind(React.Component.prototype)();
ReactDOM.render(<Provider store={store}>
    <Router />
</Provider>, document.getElementById('root'));
registerServiceWorker();
