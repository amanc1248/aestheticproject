import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import thunk from "redux-thunk";
import {
  adminChangeEmployeePasswordReducer,
  adminFetchEmployeeReducer,
  adminLoginReducer,
} from "./reducers/adminReducers";
const middleware = [thunk];
const reducer = combineReducers({
  adminLoginReducer: adminLoginReducer,
  adminFetchEmployeeReducer: adminFetchEmployeeReducer,
  adminChangeEmployeePasswordReducer: adminChangeEmployeePasswordReducer,
});
const initialState = {};
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
