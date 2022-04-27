import {
  ADMIN_ADD_EMPLOYEE,
  ADMIN_ADD_EMPLOYEE_FAILURE,
  ADMIN_ADD_EMPLOYEE_SUCCESS,
  ADMIN_CHANGE_EMPLOYEE_PASSWORD,
  ADMIN_CHANGE_EMPLOYEE_PASSWORD_CLEAN_ERROR,
  ADMIN_CHANGE_EMPLOYEE_PASSWORD_FAILURE,
  ADMIN_CHANGE_EMPLOYEE_PASSWORD_SUCCESS,
  ADMIN_EDIT_EMPLOYEE,
  ADMIN_EDIT_EMPLOYEE_FAILURE,
  ADMIN_EDIT_EMPLOYEE_SUCCESS,
  ADMIN_FETCH_EMPLOYEES,
  ADMIN_FETCH_EMPLOYEES_FAILURE,
  ADMIN_FETCH_EMPLOYEES_SUCCESS,
  ADMIN_LOGIN,
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGIN_SUCCESS,
  CLEAN_ERROR,
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

// admin EDIT EMPLOYEE
export const adminEditEmployeeAction = (employee) => async (dispatch) => {
  console.log("adminFetchEmployeeAction Ran...");
  try {
    dispatch({
      type: ADMIN_EDIT_EMPLOYEE,
    });
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `/api/admin/editEmployee`,
      employee,
      config
    );
    dispatch({
      type: ADMIN_EDIT_EMPLOYEE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_EDIT_EMPLOYEE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// admin CHANGE EMPLOYEE PASSWORD
export const adminChangeEmployeePasswordAction =
  (employeeId, oldPassword, newPassword) => async (dispatch) => {
    console.log("adminChangeEmployeePasswordAction Ran...");
    try {
      dispatch({
        type: ADMIN_CHANGE_EMPLOYEE_PASSWORD,
      });
      const config = {
        header: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        `/api/admin/changeEmployeePassword`,
        { employeeId, oldPassword, newPassword },
        config
      );
      dispatch({
        type: ADMIN_CHANGE_EMPLOYEE_PASSWORD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ADMIN_CHANGE_EMPLOYEE_PASSWORD_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// admin CHANGE EMPLOYEE PASSWORD CLEAN ERROR
export const adminChangeEmployeePasswordActionCleanError =
  () => async (dispatch) => {
    console.log("adminChangeEmployeePasswordAction Ran...");
    dispatch({
      type: ADMIN_CHANGE_EMPLOYEE_PASSWORD_CLEAN_ERROR,
    });
  };
