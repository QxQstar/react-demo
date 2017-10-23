import {combineReducers,createStore} from 'redux';
import attrendance from './reducer/attrendance/index.js';
export default createStore(combineReducers({
    attrendance
}));