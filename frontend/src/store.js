import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import thunk from "redux-thunk";
import {
  adminAddEmployeeReducer,
  adminChangeEmployeePasswordReducer,
  adminDeleteEmployeeReducer,
  adminFetchEmployeeReducer,
  adminLoginReducer,
} from "./reducers/adminReducers";
import {
  employeeFetchUsersReducer,
  employeeLoginReducer,
} from "./reducers/employeeReducers";
const middleware = [thunk];
const reducer = combineReducers({
  adminLoginReducer: adminLoginReducer,
  adminAddEmployeeReducer: adminAddEmployeeReducer,
  adminFetchEmployeeReducer: adminFetchEmployeeReducer,
  adminChangeEmployeePasswordReducer: adminChangeEmployeePasswordReducer,
  adminDeleteEmployeeReducer: adminDeleteEmployeeReducer,
  employeeLoginReducer: employeeLoginReducer,
  employeeFetchUsersReducer: employeeFetchUsersReducer,
});
const initialState = {};
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
