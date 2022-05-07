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

export const checkEmployeeLoginStatusReducer = (state = {}, action) => {
  switch (action.type) {
    case CHECK_EMPLOYEE_LOGIN_STATUS:
      return { loading: true };
    case CHECK_EMPLOYEE_LOGIN_STATUS_SUCCESS:
      return { loading: false, checkEmployeeLoginStatus: action.payload };
    case CHECK_EMPLOYEE_LOGIN_STATUS_FAIL:
      return { loading: false, error: action.payload };
    case CHECK_EMPLOYEE_LOGIN_STATUS_CLEAN:
      return { checkEmployeeLoginStatus: null, error: null };

    default:
      return state;
  }
};
export const employeeByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case EMPLOYEE_BY_ID:
      return { loading: true };
    case EMPLOYEE_BY_ID_SUCCESS:
      return { loading: false, employeeById: action.payload };
    case EMPLOYEE_BY_ID_FAILURE:
      return { loading: false, error: action.payload };
    case EMPLOYEE_BY_ID_CLEAN:
      return { employeeById: null };

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

export const employeeFetchMostPopularNFTsReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_MOST_POPULAR_NFT:
      return { loading: true };
    case FETCH_MOST_POPULAR_NFT_SUCCESS:
      return { loading: false, popularNFTs: action.payload };
    case FETCH_MOST_POPULAR_NFT_FAILURE:
      return { loading: false, error: action.payload };
    case FETCH_MOST_POPULAR_NFT_CLEAN:
      return { popularNFTs: null };

    default:
      return state;
  }
};
export const employeeFetchNewlyMintedNFTsReducer = (state = {}, action) => {
  switch (action.type) {
    case NEWLY_MINTED_NFTS:
      return { loading: true };
    case NEWLY_MINTED_NFTS_SUCCESS:
      return { loading: false, newlyMintedNFTs: action.payload };
    case NEWLY_MINTED_NFTS_FAILURE:
      return { loading: false, error: action.payload };
    case NEWLY_MINTED_NFTS_CLEAN:
      return { newlyMintedNFTs: null };

    default:
      return state;
  }
};
export const employeeSendEmailReducer = (state = {}, action) => {
  switch (action.type) {
    case SEND_EMAIL:
      return { loading: true };
    case SEND_EMAIL_SUCCESS:
      return { loading: false, sentEmail: action.payload };
    case SEND_EMAIL_FAILURE:
      return { loading: false, error: action.payload };
    case SEND_EMAIL_CLEAN:
      return { sentEmail: null };

    default:
      return state;
  }
};
