import { combineReducers } from 'redux'
import movieReducers from './reducer'

const rootReducer = combineReducers({
  data: movieReducers,
})

export default rootReducer
