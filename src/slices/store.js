import { configureStore } from '@reduxjs/toolkit'
import coursesReducer from './coursesSlice'
import showsReducer from './showsSlice'
import movieReducer from './movieSlice'
import todosReducer from './todosSlice'
import booksReducer from './booksSlice'

const store = configureStore({
  reducer: {
    courses: coursesReducer,
    shows: showsReducer,
    movies: movieReducer,
    todos: todosReducer,
    books: booksReducer,
  },
})

export default store
