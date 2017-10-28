import {combineReducers,createStore} from 'redux';
import attrendance from './reducer/attrendance/index.js';
import holiday from './reducer/holiday/index.js'
export default createStore(combineReducers({
    attrendance,
    holiday
}));