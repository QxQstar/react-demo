import {combineReducers,createStore} from 'redux';
import attrendance from './reducer/attrendance/index.js';
import holiday from './reducer/holiday/index.js';
import baseData from './reducer/baseData/index.js';
import att from './reducer/att/index.js';
export default createStore(combineReducers({
    attrendance,
    holiday,
    baseData,
    att
}));