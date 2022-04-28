import {
  EMPLOYEE_FETCH_USERS,
  EMPLOYEE_FETCH_USERS_FAIL,
  EMPLOYEE_FETCH_USERS_SUCCESS,
  EMPLOYEE_LOGIN,
  EMPLOYEE_LOGIN_FAIL,
  EMPLOYEE_LOGIN_SUCCESS,
} from "../constants/employeeConstants";

export const employeeLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case EMPLOYEE_LOGIN:
      return { loading: true };
    case EMPLOYEE_LOGIN_SUCCESS:
      return { loading: false, employeeLogin: action.payload };
    case EMPLOYEE_LOGIN_FAIL:
      return { loading: false, error: action.payload };

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

    default:
      return state;
  }
};
