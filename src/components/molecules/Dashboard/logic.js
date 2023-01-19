import {apiCall} from '../../../services/httpServices'
const patronDetailsActive = {
  "gmNumber": 112138414,
  "firstName": "John",
  "lastName": "Smith",
  "dob": "12/05/1984",
  "propertyId": "G1",
  "currencyCode": "USD",
  "totalMomentumDollarBalance": 25.44,
  "accountNumber": 123456784,
  "status": 'active'
}
const patronDetailsSuspended = {
  "gmNumber": 112138415,
  "firstName": "Jason",
  "lastName": "Main",
  "dob": "12/04/1985",
  "propertyId": "G2",
  "currencyCode": "USD",
  "totalMomentumDollarBalance": 25.45,
  "accountNumber": 123456785,
  "status": 'suspended'
}
const initialPatronDetails = {
    loading: false,
    error: false,
    flag: false,
    data: []
  }
    
    
  const PATRON_DETAILS = 'PATRON_DETAILS'
  const PATRON_DETAILS_RESET = 'PATRON_DETAILS_RESET'
  const PATRON_DETAILS_SUCCESS = 'PATRON_DETAILS_SUCCESS'
  const PATRON_DETAILS_FAILURE = 'PATRON_DETAILS_FAILURE'
  
  export function patronDetailsResetAction () {
    return {
      type: PATRON_DETAILS_RESET
    }
  }
  
  export function patronDetailsInitialAction() {
    return {
      type: PATRON_DETAILS
    }
  }
  
  export function patronDetailsSuccessAction(payload) {
    return {
      type: PATRON_DETAILS_SUCCESS,
      payload
    
    }
  }
  
  export function patronDetailsFailureAction(payload) {
    return {
      type: PATRON_DETAILS_FAILURE,
      payload
    }
  }
  
  export function patronDetailsAction (propertyId,accountNumber) {
    return async (dispatch) => {
      try {
        dispatch(patronDetailsInitialAction())     
          const response = await apiCall({
            method: 'get',
            url: `/search/accountInfo/${propertyId}/accounts/${accountNumber}`
          })
        dispatch(patronDetailsSuccessAction(response))
      } catch (error) {
        if(propertyId === 'G1'){
          dispatch(patronDetailsSuccessAction(patronDetailsActive))

        } else {
          dispatch(patronDetailsSuccessAction(patronDetailsSuspended))
        }
        // dispatch(patronDetailsFailureAction())
      }
    }
  }
  
  export function patronDetailsReducer(state = initialPatronDetails, action) {
    switch (action.type) {
      case PATRON_DETAILS:
        return {
          ...state,
          loading: true,
          error: false,
          flag: false,
          data: []
        }
      case PATRON_DETAILS_RESET:
        return {
          ...state,
          loading: false,
          error: false,
          flag: false,
          data: []
        }
      case PATRON_DETAILS_SUCCESS:
        return {
          ...state,
          loading: false,
          error: false,
          flag: true,
          data: action.payload
        }
      case PATRON_DETAILS_FAILURE:
        return {
          ...state,
          loading: false,
          error: true,
          flag: false,
          data: []
        }
      default:
        return state
    }
  }


/* Back drop loader open close logic */
const NAVIGATE_HOME_OPEN = 'NAVIGATE_HOME_OPEN'
const NAVIGATE_HOME_CLOSE = 'NAVIGATE_HOME_CLOSE'

const initialHomeState = {
  open: false,
  data: {}
}

export function navigateHomeOpenAction(payload = {}) {
  return {
    type: NAVIGATE_HOME_OPEN,
    payload
  }
}

export function navigateHomeCloseAction () {
  return {
    type: NAVIGATE_HOME_CLOSE,
  }
}

export function navigateHomeReducer (state = initialHomeState, action) {
  switch (action.type) {
    case NAVIGATE_HOME_OPEN:
      return {
        ...state,
        open: true,
        data: action.payload
      }
    case NAVIGATE_HOME_CLOSE:
      return {
        ...state,
        open: false,
        data: {}
      }
    default:
      return state
  }
}
