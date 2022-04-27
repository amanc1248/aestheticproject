import {
  ADMIN_ADD_EMPLOYEE,
  ADMIN_ADD_EMPLOYEE_FAILURE,
  ADMIN_ADD_EMPLOYEE_SUCCESS,
  ADMIN_CHANGE_EMPLOYEE_PASSWORD,
  ADMIN_CHANGE_EMPLOYEE_PASSWORD_CLEAN_ERROR,
  ADMIN_CHANGE_EMPLOYEE_PASSWORD_FAILURE,
  ADMIN_CHANGE_EMPLOYEE_PASSWORD_SUCCESS,
  ADMIN_FETCH_EMPLOYEES,
  ADMIN_FETCH_EMPLOYEES_SUCCESS,
  ADMIN_LOGIN,
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGIN_SUCCESS,
  CLEAN_ERROR,
} from "../constants/adminConstants";

export const adminLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_LOGIN:
      return { loading: true };
    case ADMIN_LOGIN_SUCCESS:
      return { loading: false, adminLogin: action.payload };
    case ADMIN_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const adminAddEmployeeReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_ADD_EMPLOYEE:
      return { loading: true };
    case ADMIN_ADD_EMPLOYEE_SUCCESS:
      return { loading: false, addEmployee: action.payload };
    case ADMIN_ADD_EMPLOYEE_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const adminFetchEmployeeReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_FETCH_EMPLOYEES:
      return { loading: true };
    case ADMIN_FETCH_EMPLOYEES_SUCCESS:
      return { loading: false, adminEmployees: action.payload };
    case ADMIN_ADD_EMPLOYEE_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const adminEditEmployeeReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_FETCH_EMPLOYEES:
      return { loading: true };
    case ADMIN_FETCH_EMPLOYEES_SUCCESS:
      return { loading: false, editedEmployee: action.payload };
    case ADMIN_ADD_EMPLOYEE_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const adminChangeEmployeePasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_CHANGE_EMPLOYEE_PASSWORD:
      return { loading: true };
    case ADMIN_CHANGE_EMPLOYEE_PASSWORD_SUCCESS:
      return { loading: false, changedPassword: action.payload };
    case ADMIN_CHANGE_EMPLOYEE_PASSWORD_FAILURE:
      return { loading: false, error: action.payload };
    case ADMIN_CHANGE_EMPLOYEE_PASSWORD_CLEAN_ERROR:
      return { error: null };
    default:
      return state;
  }
};
