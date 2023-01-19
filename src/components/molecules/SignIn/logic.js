import { apiCall } from "../../../services/httpServices";
const initialSignIn = {
  loading: false,
  error: false,
  flag: false,
  data: [],
};

const SIGN_IN = "SIGN_IN";
const SIGN_IN_RESET = "SIGN_IN_RESET";
const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS";
const SIGN_IN_FAILURE = "SIGN_IN_FAILURE";

export function signInResetAction() {
  return {
    type: SIGN_IN_RESET,
  };
}

export function signInInitialAction() {
  return {
    type: SIGN_IN,
  };
}

export function signInSuccessAction(payload) {
  return {
    type: SIGN_IN_SUCCESS,
    payload,
  };
}

export function signInFailureAction(payload) {
  return {
    type: SIGN_IN_FAILURE,
    payload,
  };
}

export function signInAction(payload) {
  return async (dispatch) => {
    try {
      dispatch(signInInitialAction());
      // const response = await apiCall({
      //   method: "post",
      //   url: "/signin",
      //   data: payload,
      // });
      dispatch(signInSuccessAction(payload));
    } catch (error) {
      dispatch(signInSuccessAction(payload));
      // dispatch(signInFailureAction())
    }
  };
}

export function signInReducer(state = initialSignIn, action) {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: [],
      };
    case SIGN_IN_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: [],
      };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload,
      };
    case SIGN_IN_FAILURE:
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

const propertyIdResponse = {
  "gmProperties": [
      {
        "propertyId": "G1",
        "propertyName": "MSCT"
      },
      {
        "propertyId": "G2",
        "propertyName": "MPA"
      },
      { propertyId: "IGT123518",
        propertyName: "MLV"
    }
  ]
};
const initialPropertyId = {
  loading: false,
  error: false,
  flag: false,
  data: [],
};

const PROPERTY_ID = "PROPERTY_ID";
const PROPERTY_ID_RESET = "PROPERTY_ID_RESET";
const PROPERTY_ID_SUCCESS = "PROPERTY_ID_SUCCESS";
const PROPERTY_ID_FAILURE = "PROPERTY_ID_FAILURE";

export function propertyIdResetAction() {
  return {
    type: PROPERTY_ID_RESET,
  };
}

export function propertyIdInitialAction() {
  return {
    type: PROPERTY_ID,
  };
}

export function propertyIdSuccessAction(payload) {
  return {
    type: PROPERTY_ID_SUCCESS,
    payload,
  };
}

export function propertyIdFailureAction(payload) {
  return {
    type: PROPERTY_ID_FAILURE,
    payload,
  };
}

export function propertyIdAction() {
  return async (dispatch) => {
    try {
      dispatch(propertyIdInitialAction());
      const response = await apiCall({
        method: "get",
        url: "/gm/mohegan/properties",
      });
      console.log(response)
      dispatch(propertyIdSuccessAction(propertyIdResponse?.gmProperties));
    } catch (error) {
      dispatch(propertyIdSuccessAction(propertyIdResponse?.gmProperties));
      // dispatch(propertyIdFailureAction())
    }
  };
}

export function propertyIdReducer(state = initialPropertyId, action) {
  switch (action.type) {
    case PROPERTY_ID:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: [],
      };
    case PROPERTY_ID_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: [],
      };
    case PROPERTY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload,
      };
    case PROPERTY_ID_FAILURE:
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
