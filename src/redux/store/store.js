import { createStore ,applyMiddleware } from 'redux'
import rootReducer from './reducers/rootreducer';
 import {thunk} from 'redux-thunk';
 const store = createStore(rootReducer,applyMiddleware(thunk))
 export default store

// import { configureStore } from "@reduxjs/toolkit";
// import { userReducer } from "./reducers/userReducers";
// import { adminReducer } from "./reducers/adminReducer";
// export default configureStore({
//   reducer: {
//     user: userReducer,
//     admin: adminReducer,
//   },
// });
