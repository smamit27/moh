import { combineReducers } from 'redux'
import {signInReducer, propertyIdReducer} from '../components/molecules/SignIn/logic'
import { statusNotificationReducer } from '../components/molecules/StatusNotification/logic'
import { backDropLoaderReducer } from '../components/molecules/BackDropLoader/logic'
import { navigateHomeReducer, patronDetailsReducer } from '../components/molecules/Dashboard/logic'
import { linkedAccountListReducer} from '../components/molecules/PatronDetails/logic'
import {getTransactionDetailsReducer} from '../components/molecules/PatronDetails/logic'
const rootReducer = combineReducers({
    signIn: signInReducer,
    propertyId: propertyIdReducer,
    navigateHome: navigateHomeReducer,
    statusNotification: statusNotificationReducer,
    backDropLoader : backDropLoaderReducer,
    patronLocalDetails: patronDetailsReducer,
    linkedAccountList: linkedAccountListReducer,
    transactionDetails:getTransactionDetailsReducer
    
})

export default rootReducer