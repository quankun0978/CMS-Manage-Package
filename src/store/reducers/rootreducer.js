import { combineReducers } from 'redux';
import { userReducer } from './userReducers';
import { adminReducer } from './adminReducer';

const rootReducer = combineReducers({
  user: userReducer,
  admin: adminReducer,
});

export default rootReducer;
