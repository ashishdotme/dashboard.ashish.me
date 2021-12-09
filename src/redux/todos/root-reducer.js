import { combineReducers } from 'redux'
import todoReducers from './reducer'

const rootReducer = combineReducers({
  data: todoReducers,
})

export default rootReducer
