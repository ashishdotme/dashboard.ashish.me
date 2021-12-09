import { combineReducers } from 'redux'
import showReducers from './reducer'

const rootReducer = combineReducers({
  data: showReducers,
})

export default rootReducer
