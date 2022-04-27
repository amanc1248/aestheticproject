import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import thunk from "redux-thunk";
import {
  adminFetchEmployeeReducer,
  adminLoginReducer,
} from "./reducers/adminReducers";
const middleware = [thunk];
const reducer = combineReducers({
  adminLoginReducer: adminLoginReducer,
  adminFetchEmployeeReducer: adminFetchEmployeeReducer,
});
const initialState = {};
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;