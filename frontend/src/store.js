import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import thunk from "redux-thunk";
import {
  adminAddEmployeeReducer,
  adminChangeEmployeePasswordReducer,
  adminDeleteEmployeeReducer,
  adminEditEmployeeReducer,
  adminFetchEmployeeReducer,
  adminLoginReducer,
  adminLogoutReducer,
} from "./reducers/adminReducers";
import {
  employeeFetchUsersReducer,
  employeeLoginReducer,
  employeeLogoutReducer,
} from "./reducers/employeeReducers";
const middleware = [thunk];
const reducer = combineReducers({
  adminLoginReducer: adminLoginReducer,
  adminLogoutReducer: adminLogoutReducer,
  adminAddEmployeeReducer: adminAddEmployeeReducer,
  adminEditEmployeeReducer: adminEditEmployeeReducer,
  adminFetchEmployeeReducer: adminFetchEmployeeReducer,
  adminChangeEmployeePasswordReducer: adminChangeEmployeePasswordReducer,
  adminDeleteEmployeeReducer: adminDeleteEmployeeReducer,
  employeeLoginReducer: employeeLoginReducer,
  employeeLogoutReducer: employeeLogoutReducer,
  employeeFetchUsersReducer: employeeFetchUsersReducer,
});
const initialState = {
  adminLoginReducer: { adminLogin: null },
};
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
