import { combineReducers } from 'redux';
import ui from './ui/uiReducer';
import read from './read/readReducer';
import write from './write/writeReducer';

const origoAdmin = combineReducers({
  read,
  write,
  ui
})
const rootState = combineReducers({
  origoAdmin
})

export default rootState;