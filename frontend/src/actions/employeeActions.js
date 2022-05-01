import axios from "axios";
import {
  EMPLOYEE_FETCH_USERS,
  EMPLOYEE_FETCH_USERS_CLEAN,
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

// employee LOGIN
export const employeeLoginAction = (username, password) => async (dispatch) => {
  try {
    dispatch({
      type: EMPLOYEE_LOGIN,
    });
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `/api/employee/employeeLogin`,
      { username, password },
      config
    );
    dispatch({
      type: EMPLOYEE_LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EMPLOYEE_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// employee LOGIN CLEAN
export const employeeLoginClean = () => async (dispatch) => {
  dispatch({
    type: EMPLOYEE_LOGIN_CLEAN,
  });
};

// employee FETCH USERS
export const employeeFetchUsersAction = () => async (dispatch) => {
  try {
    dispatch({
      type: EMPLOYEE_FETCH_USERS,
    });
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(`/api/employee/fetchUsers`, config);
    dispatch({
      type: EMPLOYEE_FETCH_USERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EMPLOYEE_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//employee FETCH USERS CLEAN
export const employeeFetchUsersClean = () => async (dispatch) => {
  dispatch({
    type: EMPLOYEE_FETCH_USERS_CLEAN,
  });
};

export const employeeLogoutAction = () => async (dispatch) => {
  try {
    dispatch({
      type: EMPLOYEE_LOGOUT,
    });
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(`/api/employee/logout`, config);
    dispatch({
      type: EMPLOYEE_LOGOUT_SUCCESS,
      payload: data,
    });
    console.log("Logout action data: ", data);
  } catch (error) {
    dispatch({
      type: EMPLOYEE_LOGOUT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//employee EMPLOYEE LOGOUT CLEAN
export const employeeLogoutClean = () => async (dispatch) => {
  dispatch({
    type: EMPLOYEE_LOGOUT_CLEAN,
  });
};
