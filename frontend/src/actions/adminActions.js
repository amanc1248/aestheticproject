import {
  ADMIN_ADD_EMPLOYEE,
  ADMIN_ADD_EMPLOYEE_CLEAR,
  ADMIN_ADD_EMPLOYEE_FAILURE,
  ADMIN_ADD_EMPLOYEE_SUCCESS,
  ADMIN_CHANGE_EMPLOYEE_PASSWORD,
  ADMIN_CHANGE_EMPLOYEE_PASSWORD_CLEAN_ERROR,
  ADMIN_CHANGE_EMPLOYEE_PASSWORD_FAILURE,
  ADMIN_CHANGE_EMPLOYEE_PASSWORD_SUCCESS,
  ADMIN_DELETE_EMPLOYEE,
  ADMIN_DELETE_EMPLOYEE_CLEAN,
  ADMIN_DELETE_EMPLOYEE_FAILURE,
  ADMIN_DELETE_EMPLOYEE_SUCCESS,
  ADMIN_EDIT_EMPLOYEE,
  ADMIN_EDIT_EMPLOYEE_CLEAN,
  ADMIN_EDIT_EMPLOYEE_FAILURE,
  ADMIN_EDIT_EMPLOYEE_SUCCESS,
  ADMIN_FETCH_EMPLOYEES,
  ADMIN_FETCH_EMPLOYEES_FAILURE,
  ADMIN_FETCH_EMPLOYEES_SUCCESS,
  ADMIN_LOGIN,
  ADMIN_LOGIN_CLEAN,
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGOUT,
  ADMIN_LOGOUT_FAILURE,
  AMDIN_LOGOUT_SUCCESS,
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

// admin CHANGE EMPLOYEE PASSWORD CLEAN ERROR
export const adminLoginClean = () => async (dispatch) => {
  dispatch({
    type: ADMIN_LOGIN_CLEAN,
  });
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

// admin CHANGE EMPLOYEE PASSWORD CLEAN ERROR
export const adminAddEmployeeClear = () => async (dispatch) => {
  dispatch({
    type: ADMIN_ADD_EMPLOYEE_CLEAR,
  });
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

// admin EDIT EMPLOYEE
export const adminEditEmployeeClean = () => async (dispatch) => {
  dispatch({
    type: ADMIN_EDIT_EMPLOYEE_CLEAN,
  });
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

// admin DELETE EMPLOYEE
export const adminDeleteEmployeeAction = (employeeId) => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_DELETE_EMPLOYEE,
    });
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.delete(
      `/api/admin/deleteEmployee/${employeeId}`,
      config
    );
    dispatch({
      type: ADMIN_DELETE_EMPLOYEE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_DELETE_EMPLOYEE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// admin DELETE EMPLOYEE CLEAN
export const adminDeleteEmployeeClean = () => async (dispatch) => {
  dispatch({
    type: ADMIN_DELETE_EMPLOYEE_CLEAN,
  });
};

// admin LOGOUT
export const adminLogoutAction = () => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_LOGOUT,
    });
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(`/api/admin/logout`, config);
    dispatch({
      type: AMDIN_LOGOUT_SUCCESS,
      payload: data,
    });
    console.log("Logout action data: ", data);
  } catch (error) {
    dispatch({
      type: ADMIN_LOGOUT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
