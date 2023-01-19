import { apiCall } from "../../../services/httpServices";
import {ROWS_TRANSACTION} from './constants'

const linkedAccountListResponse = {
  "linkedAccounts": 
    [
      {
        "propertyName": "Vegas",
        "accountNumber": 12345678
      },
      {
        "propertyName": "Fallsview",
        "accountNumber": 45555555
      }
    ]
  
}
const initialLinkedAccountList = {
    loading: false,
    error: false,
    flag: false,
    data: [],
  };
  
  const LINKED_ACCOUNT_LIST = "LINKED_ACCOUNT_LIST";
  const LINKED_ACCOUNT_LIST_RESET = "LINKED_ACCOUNT_LIST_RESET";
  const LINKED_ACCOUNT_LIST_SUCCESS = "LINKED_ACCOUNT_LIST_SUCCESS";
  const LINKED_ACCOUNT_LIST_FAILURE = "LINKED_ACCOUNT_LIST_FAILURE";
  
  export function linkedAccountListResetAction() {
    return {
      type: LINKED_ACCOUNT_LIST_RESET,
    };
  }
  
  export function linkedAccountListInitialAction() {
    return {
      type: LINKED_ACCOUNT_LIST,
    };
  }
  
  export function linkedAccountListSuccessAction(payload) {
    return {
      type: LINKED_ACCOUNT_LIST_SUCCESS,
      payload,
    };
  }
  
  export function linkedAccountListFailureAction(payload) {
    return {
      type: LINKED_ACCOUNT_LIST_FAILURE,
      payload,
    };
  }
  
  export function linkedAccountListAction(gmNumber) {
    return async (dispatch) => {
      try {
        dispatch(linkedAccountListInitialAction());
        const response = await apiCall({
          method: "get",
          url: `/fetch/linkedAccounts/globalMomentum/${gmNumber}`,
        });
        console.log(response)
        dispatch(linkedAccountListSuccessAction(linkedAccountListResponse?.linkedAccounts));
      } catch (error) {
        dispatch(linkedAccountListSuccessAction(linkedAccountListResponse?.linkedAccounts));
        // dispatch(linkedAccountListFailureAction())
      }
    };
  }
  
  export function linkedAccountListReducer(state = initialLinkedAccountList, action) {
    switch (action.type) {
      case LINKED_ACCOUNT_LIST:
        return {
          ...state,
          loading: true,
          error: false,
          flag: false,
          data: [],
        };
      case LINKED_ACCOUNT_LIST_RESET:
        return {
          ...state,
          loading: false,
          error: false,
          flag: false,
          data: [],
        };
      case LINKED_ACCOUNT_LIST_SUCCESS:
        return {
          ...state,
          loading: false,
          error: false,
          flag: true,
          data: action.payload,
        };
      case LINKED_ACCOUNT_LIST_FAILURE:
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



const initialGetTransactionDetails = {
  loading: false,
  error: false,
  flag: false,
  data: [],
};

const GET_TRANSACTION_DETAILS = "GET_TRANSACTION_DETAILS";
const GET_TRANSACTION_DETAILS_RESET = "GET_TRANSACTION_DETAILS_RESET";
const GET_TRANSACTION_DETAILS_SUCCESS = "GET_TRANSACTION_DETAILS_SUCCESS";
const GET_TRANSACTION_DETAILS_FAILURE = "GET_TRANSACTION_DETAILS_FAILURE";

export function getTransactionDetailsResetAction() {
  return {
    type: GET_TRANSACTION_DETAILS_RESET,
  };
}

export function getTransactionDetailsInitialAction() {
  return {
    type: GET_TRANSACTION_DETAILS,
  };
}

export function getTransactionDetailsSuccessAction(payload) {
  return {
    type: GET_TRANSACTION_DETAILS_SUCCESS,
    payload,
  };
}

export function getTransactionDetailsFailureAction(payload) {
  return {
    type: GET_TRANSACTION_DETAILS_FAILURE,
    payload,
  };
}

export function getTransactionDetailsAction(payload) {
    console.log(payload)
  return async (dispatch) => {
    try {
      dispatch(getTransactionDetailsInitialAction());
      const response = await apiCall({
        method: "get",
        url: `/inquiry/transaction-details/properties/${payload?.propertyId}/accounts/${payload?.accountNumber}`,
      });
      console.log(response)
      dispatch(getTransactionDetailsSuccessAction(ROWS_TRANSACTION));
    } catch (error) {
      dispatch(getTransactionDetailsSuccessAction(ROWS_TRANSACTION));
      // dispatch(getTransactionDetailsFailureAction())
    }
  };
}

export function getTransactionDetailsReducer(state = initialGetTransactionDetails, action) {
  switch (action.type) {
    case GET_TRANSACTION_DETAILS:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: [],
      };
    case GET_TRANSACTION_DETAILS_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: [],
      };
    case GET_TRANSACTION_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload,
      };
    case GET_TRANSACTION_DETAILS_FAILURE:
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