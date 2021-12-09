import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'
import { useRouteMatch } from 'react-router'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Footer from '../components/footer/footer'

import Navbar from '../components/navbar/navbar'
import IndexPage from '../modules/course/course'
import Home from '../modules/home/home'
import Access from '../modules/access/access'
import Movie from '../modules/movie/movie'
import Books from '../modules/books/books'
import Shows from '../modules/shows/shows'
import Todo from '../modules/todo/todo'
import CoursesTable from '../modules/manage/courses/list'
import UpdateCourse from '../modules/manage/courses/edit'
import NewCourse from '../modules/manage/courses/create'

import ProtectedRoute from '../auth/protectedRoute'

const localStorage = window.localStorage

const MainRouter = (props) => {
  const { user, isAuthenticated, isLoading } = useAuth0()
  //const { path, url } = useRouteMatch()
  console.log(window.location.pathname)
  return (
    <Router basename={'/'}>
      <div className="full-height is-flex is-flex-direction-column custom-has-navbar-fixed-top">
        <Navbar />
        <section className="main-content columns is-fullheight">
          <div className="container column is-10">
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/course" exact>
                <IndexPage />
              </Route>
              <Route path="/course/:id/edit">
                <UpdateCourse />
              </Route>
              <Route path="/create/course" exact>
                <NewCourse />
              </Route>
              <Route path="/movie" exact>
                <Movie />
              </Route>
              <Route path="/shows" exact>
                <Shows />
              </Route>
              <Route path="/books" exact>
                <Books />
              </Route>
              <Route path="/todo" exact>
                <Todo />
              </Route>
              <Route path="/access" component={Access} />
              <ProtectedRoute path="/admin/course" role="Professor" component={CoursesTable} />
            </Switch>
          </div>
        </section>

        <Footer />
      </div>
    </Router>
  )
}

export default MainRouter
