import {
  ADMIN_ADD_EMPLOYEE,
  ADMIN_ADD_EMPLOYEE_FAILURE,
  ADMIN_ADD_EMPLOYEE_SUCCESS,
  ADMIN_FETCH_EMPLOYEES,
  ADMIN_FETCH_EMPLOYEES_FAILURE,
  ADMIN_FETCH_EMPLOYEES_SUCCESS,
  ADMIN_LOGIN,
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGIN_SUCCESS,
} from "../constants/adminConstants";

const axios = require("axios");

// admin login
export const adminLoginAction = (pass) => async (dispatch) => {
  console.log("admin pass: ", pass);
  try {
    dispatch({
      type: ADMIN_LOGIN,
    });
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `/api/admin/adminLogin`,
      { pass },
      config
    );
    dispatch({
      type: ADMIN_LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// admin ADD EMPLOYEE
export const adminAddEmployeeAction = (employee) => async (dispatch) => {
  console.log(employee);
  try {
    dispatch({
      type: ADMIN_ADD_EMPLOYEE,
    });
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `/api/admin/addEmployee`,
      employee,
      config
    );
    dispatch({
      type: ADMIN_ADD_EMPLOYEE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_ADD_EMPLOYEE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// admin FETCH EMPLOYEE
export const adminFetchEmployeeAction = () => async (dispatch) => {
  console.log("adminFetchEmployeeAction Ran...");
  try {
    dispatch({
      type: ADMIN_FETCH_EMPLOYEES,
    });
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(`/api/admin/fetchEmployee`, config);
    dispatch({
      type: ADMIN_FETCH_EMPLOYEES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_FETCH_EMPLOYEES_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
