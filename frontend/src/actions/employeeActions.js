import axios from "axios";
import {
  EMPLOYEE_FETCH_USERS,
  EMPLOYEE_FETCH_USERS_SUCCESS,
  EMPLOYEE_LOGIN,
  EMPLOYEE_LOGIN_FAIL,
  EMPLOYEE_LOGIN_SUCCESS,
} from "../constants/employeeConstants";

// admin DELETE EMPLOYEE
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
