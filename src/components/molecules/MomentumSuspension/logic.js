import { apiCall } from "../../../services/httpServices";
const initialSuspendStatus = {
  loading: false,
  error: false,
  flag: false,
  data: [],
};

const SUSPEND_STATUS = "SUSPEND_STATUS";
const SUSPEND_STATUS_RESET = "SUSPEND_STATUS_RESET";
const SUSPEND_STATUS_SUCCESS = "SUSPEND_STATUS_SUCCESS";
const SUSPEND_STATUS_FAILURE = "SUSPEND_STATUS_FAILURE";

export function suspendStatusResetAction() {
  return {
    type: SUSPEND_STATUS_RESET,
  };
}

export function suspendStatusInitialAction() {
  return {
    type: SUSPEND_STATUS,
  };
}

export function suspendStatusSuccessAction(payload) {
  return {
    type: SUSPEND_STATUS_SUCCESS,
    payload,
  };
}

export function suspendStatusFailureAction(payload) {
  return {
    type: SUSPEND_STATUS_FAILURE,
    payload,
  };
}

export function suspendStatusAction(payload) {
    console.log(payload)
  return async (dispatch) => {
    try {
      dispatch(suspendStatusInitialAction());
      const response = await apiCall({
        method: "post",
        url: `/suspend/gmAccountNum/${payload?.request?.gmAccountNum}/status/${payload?.request?.status}`,
        data: payload?.data,
      });
      console.log(response)
      dispatch(suspendStatusSuccessAction(payload));
    } catch (error) {
      dispatch(suspendStatusSuccessAction(payload));
      // dispatch(suspendStatusFailureAction())
    }
  };
}

export function suspendStatusReducer(state = initialSuspendStatus, action) {
  switch (action.type) {
    case SUSPEND_STATUS:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: [],
      };
    case SUSPEND_STATUS_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: [],
      };
    case SUSPEND_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload,
      };
    case SUSPEND_STATUS_FAILURE:
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