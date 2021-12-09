import { combineReducers } from 'redux'
import courseReducers from './reducer'

const rootReducer = combineReducers({
  data: courseReducers,
})

export default rootReducer
