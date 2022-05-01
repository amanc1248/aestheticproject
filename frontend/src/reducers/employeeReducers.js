import {
  EMPLOYEE_FETCH_USERS,
  EMPLOYEE_FETCH_USERS_CLEAN,
  EMPLOYEE_FETCH_USERS_FAIL,
  EMPLOYEE_FETCH_USERS_SUCCESS,
  EMPLOYEE_LOGIN,
  EMPLOYEE_LOGIN_CLEAN,
  EMPLOYEE_LOGIN_FAIL,
  EMPLOYEE_LOGIN_SUCCESS,
  EMPLOYEE_LOGOUT,
  EMPLOYEE_LOGOUT_CLEAN,
  EMPLOYEE_LOGOUT_FAIL,
  EMPLOYEE_LOGOUT_SUCCESS,
} from "../constants/employeeConstants";

export const employeeLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case EMPLOYEE_LOGIN:
      return { loading: true };
    case EMPLOYEE_LOGIN_SUCCESS:
      return { loading: false, employeeLogin: action.payload };
    case EMPLOYEE_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case EMPLOYEE_LOGIN_CLEAN:
      return { employeeLogin: null };

    default:
      return state;
  }
};

export const employeeFetchUsersReducer = (state = {}, action) => {
  switch (action.type) {
    case EMPLOYEE_FETCH_USERS:
      return { loading: true };
    case EMPLOYEE_FETCH_USERS_SUCCESS:
      return { loading: false, fetchedUsers: action.payload };
    case EMPLOYEE_FETCH_USERS_FAIL:
      return { loading: false, error: action.payload };
    case EMPLOYEE_FETCH_USERS_CLEAN:
      return { fetchedUsers: null };

    default:
      return state;
  }
};

export const employeeLogoutReducer = (state = {}, action) => {
  switch (action.type) {
    case EMPLOYEE_LOGOUT:
      return { loading: true };
    case EMPLOYEE_LOGOUT_SUCCESS:
      return { loading: false, employeeLogout: action.payload };
    case EMPLOYEE_LOGOUT_FAIL:
      return { loading: false, error: action.payload };
    case EMPLOYEE_LOGOUT_CLEAN:
      return { employeeLogout: null };

    default:
      return state;
  }
};
