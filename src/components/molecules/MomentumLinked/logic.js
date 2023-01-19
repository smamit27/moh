import { apiCall } from "../../../services/httpServices";
// Unlink //
const initialUnlinkAccount = {
  loading: false,
  error: false,
  flag: false,
  data: [],
};

const UNLINK_ACCOUNT = "UNLINK_ACCOUNT";
const UNLINK_ACCOUNT_RESET = "UNLINK_ACCOUNT_RESET";
const UNLINK_ACCOUNT_SUCCESS = "UNLINK_ACCOUNT_SUCCESS";
const UNLINK_ACCOUNT_FAILURE = "UNLINK_ACCOUNT_FAILURE";

export function unlinkAccountResetAction() {
  return {
    type: UNLINK_ACCOUNT_RESET,
  };
}

export function unlinkAccountInitialAction() {
  return {
    type: UNLINK_ACCOUNT,
  };
}

export function unlinkAccountSuccessAction(payload) {
  return {
    type: UNLINK_ACCOUNT_SUCCESS,
    payload,
  };
}

export function unlinkAccountFailureAction(payload) {
  return {
    type: UNLINK_ACCOUNT_FAILURE,
    payload,
  };
}

export function unlinkAccountAction(payload) {
  return async (dispatch) => {
    try {
      dispatch(unlinkAccountInitialAction());
      const response = await apiCall({
        method: "post",
        url: `/delink/accounts/gmNumber/${payload?.request?.gmNumber}/status/${payload?.request?.status}`,
        data: payload?.data,
      });
      console.log(response)
      dispatch(unlinkAccountSuccessAction(payload));
    } catch (error) {
      dispatch(unlinkAccountSuccessAction(payload));
      // dispatch(unlinkAccountFailureAction())
    }
  };
}

export function unlinkAccountReducer(state = initialUnlinkAccount, action) {
  switch (action.type) {
    case UNLINK_ACCOUNT:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: [],
      };
    case UNLINK_ACCOUNT_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: [],
      };
    case UNLINK_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload,
      };
    case UNLINK_ACCOUNT_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        flag: false,
        data: [],
      };
    default:
      return state;
  }
}
//Link //
const initialLinkAccount = {
  loading: false,
  error: false,
  flag: false,
  data: [],
};

const LINK_ACCOUNT = "LINK_ACCOUNT";
const LINK_ACCOUNT_RESET = "LINK_ACCOUNT_RESET";
const LINK_ACCOUNT_SUCCESS = "LINK_ACCOUNT_SUCCESS";
const LINK_ACCOUNT_FAILURE = "LINK_ACCOUNT_FAILURE";

export function linkAccountResetAction() {
  return {
    type: LINK_ACCOUNT_RESET,
  };
}

export function linkAccountInitialAction() {
  return {
    type: LINK_ACCOUNT,
  };
}

export function linkAccountSuccessAction(payload) {
  return {
    type: LINK_ACCOUNT_SUCCESS,
    payload,
  };
}

export function linkAccountFailureAction(payload) {
  return {
    type: LINK_ACCOUNT_FAILURE,
    payload,
  };
}

export function linkAccountAction(payload) {
  return async (dispatch) => {
    try {
      dispatch(linkAccountInitialAction());
      const response = await apiCall({
        method: "post",
        url: `/link/accounts/${payload?.accountNumber}/property/${payload?.propertyId}/status/${payload?.status}/gmNumber/${payload?.gmNumber}`,
      });
      console.log(response)
      dispatch(linkAccountSuccessAction(payload));
    } catch (error) {
      dispatch(linkAccountSuccessAction(payload));
      // dispatch(linkAccountFailureAction())
    }
  };
}

export function linkAccountReducer(state = initialLinkAccount, action) {
  switch (action.type) {
    case LINK_ACCOUNT:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: [],
      };
    case LINK_ACCOUNT_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: [],
      };
    case LINK_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload,
      };
    case LINK_ACCOUNT_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        flag: false,
        data: [],
      };
    default:
      return state;
  }
}

  