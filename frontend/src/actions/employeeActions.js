import axios from "axios";
import {
  CHECK_EMPLOYEE_LOGIN_STATUS,
  CHECK_EMPLOYEE_LOGIN_STATUS_CLEAN,
  CHECK_EMPLOYEE_LOGIN_STATUS_FAIL,
  CHECK_EMPLOYEE_LOGIN_STATUS_SUCCESS,
  EMPLOYEE_BY_ID,
  EMPLOYEE_BY_ID_CLEAN,
  EMPLOYEE_BY_ID_FAILURE,
  EMPLOYEE_BY_ID_SUCCESS,
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
  FETCH_MOST_POPULAR_NFT,
  FETCH_MOST_POPULAR_NFT_CLEAN,
  FETCH_MOST_POPULAR_NFT_FAILURE,
  FETCH_MOST_POPULAR_NFT_SUCCESS,
  NEWLY_MINTED_NFTS,
  NEWLY_MINTED_NFTS_CLEAN,
  NEWLY_MINTED_NFTS_FAILURE,
  NEWLY_MINTED_NFTS_SUCCESS,
  SEND_EMAIL,
  SEND_EMAIL_CLEAN,
  SEND_EMAIL_FAILURE,
  SEND_EMAIL_SUCCESS,
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

// check employee login status
export const checkEmployeeLoginStatusAction = () => async (dispatch) => {
  try {
    dispatch({
      type: CHECK_EMPLOYEE_LOGIN_STATUS,
    });
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(
      `/api/employee/employeeLoginStatus`,
      config
    );
    dispatch({
      type: CHECK_EMPLOYEE_LOGIN_STATUS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CHECK_EMPLOYEE_LOGIN_STATUS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// CHECK_EMPLOYEE_LOGIN_STATUS_CLEAN
export const checkEmployeeLoginStatusClean = () => async (dispatch) => {
  dispatch({
    type: CHECK_EMPLOYEE_LOGIN_STATUS_CLEAN,
  });
};

// employee BY ID
export const employeeByIdAction = () => async (dispatch) => {
  try {
    dispatch({
      type: EMPLOYEE_BY_ID,
    });
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(`/api/employee/employeeById`, config);
    dispatch({
      type: EMPLOYEE_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EMPLOYEE_BY_ID_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// employee BY ID CLEAN
export const employeeByIdClean = () => async (dispatch) => {
  dispatch({
    type: EMPLOYEE_BY_ID_CLEAN,
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

export const employeeFetchMostPopularNFTsAction = () => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_MOST_POPULAR_NFT,
    });
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(
      `https://api.opensea.io/api/v1/assets?order_direction=desc&limit=2&include_orders=false`,
      config
    );
    dispatch({
      type: FETCH_MOST_POPULAR_NFT_SUCCESS,
      payload: data.assets,
    });
  } catch (error) {
    dispatch({
      type: FETCH_MOST_POPULAR_NFT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//employee EMPLOYEE LOGOUT CLEAN
export const employeeFetchPopularNFTsClean = () => async (dispatch) => {
  dispatch({
    type: FETCH_MOST_POPULAR_NFT_CLEAN,
  });
};

export const employeeFetchNewlyMintedNFTsAction = (api) => async (dispatch) => {
  try {
    dispatch({
      type: NEWLY_MINTED_NFTS,
    });
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(api, config);
    dispatch({
      type: NEWLY_MINTED_NFTS_SUCCESS,
      payload: data.assets,
    });
  } catch (error) {
    dispatch({
      type: NEWLY_MINTED_NFTS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//employee NEWLY MINTED NFTS CLEAN
export const employeeFetchNewlyMintedNFTsClean = () => async (dispatch) => {
  dispatch({
    type: NEWLY_MINTED_NFTS_CLEAN,
  });
};

export const employeeSendEmailAction = (emailData) => async (dispatch) => {
  try {
    dispatch({
      type: SEND_EMAIL,
    });
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `/api/employee/sendEmail`,
      emailData,
      config
    );
    dispatch({
      type: SEND_EMAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SEND_EMAIL_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const employeeSendEmailClean = () => async (dispatch) => {
  dispatch({
    type: SEND_EMAIL_CLEAN,
  });
};
