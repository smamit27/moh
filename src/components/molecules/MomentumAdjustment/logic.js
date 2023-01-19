import { apiCall } from "../../../services/httpServices";
const initialAdjustmentAmount = {
  loading: false,
  error: false,
  flag: false,
  data: [],
};

const ADJUSTMENT_AMOUNT = "ADJUSTMENT_AMOUNT";
const ADJUSTMENT_AMOUNT_RESET = "ADJUSTMENT_AMOUNT_RESET";
const ADJUSTMENT_AMOUNT_SUCCESS = "ADJUSTMENT_AMOUNT_SUCCESS";
const ADJUSTMENT_AMOUNT_FAILURE = "ADJUSTMENT_AMOUNT_FAILURE";

export function adjustmentAmountResetAction() {
  return {
    type: ADJUSTMENT_AMOUNT_RESET,
  };
}

export function adjustmentAmountInitialAction() {
  return {
    type: ADJUSTMENT_AMOUNT,
  };
}

export function adjustmentAmountSuccessAction(payload) {
  return {
    type: ADJUSTMENT_AMOUNT_SUCCESS,
    payload,
  };
}

export function adjustmentAmountFailureAction(payload) {
  return {
    type: ADJUSTMENT_AMOUNT_FAILURE,
    payload,
  };
}

export function adjustmentAmountAction(payload) {
  return async (dispatch) => {
    try {
      dispatch(adjustmentAmountInitialAction());
      const response = await apiCall({
        method: "post",
        url: `/adjustment/adjust-balance/properties/${payload?.request?.propertyId}/accounts/${payload?.request?.accountNumber}`,
        data: payload?.data,
      });
      console.log(response)
      dispatch(adjustmentAmountSuccessAction(payload));
    } catch (error) {
      dispatch(adjustmentAmountSuccessAction(payload));
      // dispatch(adjustmentAmountFailureAction())
    }
  };
}

export function adjustmentAmountReducer(state = initialAdjustmentAmount, action) {
  switch (action.type) {
    case ADJUSTMENT_AMOUNT:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: [],
      };
    case ADJUSTMENT_AMOUNT_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: [],
      };
    case ADJUSTMENT_AMOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload,
      };
    case ADJUSTMENT_AMOUNT_FAILURE:
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