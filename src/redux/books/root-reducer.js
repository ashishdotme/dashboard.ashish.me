import { combineReducers } from 'redux'
import bookReducers from './reducer'

const rootReducer = combineReducers({
  data: bookReducers,
})

export default rootReducer
