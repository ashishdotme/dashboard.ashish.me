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
import {
  FaBeer,
  FaHome,
  FaNewspaper,
  FaCloud,
  FaAddressBook,
  FaLink,
  FaVideo,
  FaUserGraduate,
  FaCalendar,
} from 'react-icons/fa'

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
          <aside className="column is-2 is-narrow-mobile is-fullheight section is-hidden-mobile">
            <p className="menu-label is-hidden-touch">Navigation</p>
            <ul className="menu-list">
              <li>
                <Link to={'/'}>
                  <span className="icon">
                    <FaHome className="fas" />
                  </span>{' '}
                  Home
                </Link>
              </li>
              <li>
                <Link to={'/todos'}>
                  <span className="icon">
                    <FaNewspaper className="fas" />
                  </span>{' '}
                  Todos
                </Link>
              </li>
              <li>
                <Link to={'/shows'}>
                  <span className="icon">
                    <FaCloud className="fas" />
                  </span>{' '}
                  Shows
                </Link>
              </li>
              <li>
                <Link to={'/books'}>
                  <span className="icon">
                    <FaAddressBook className="fas" />
                  </span>{' '}
                  Books
                </Link>
              </li>
              <li>
                <Link to={'/courses'}>
                  <span className="icon">
                    <FaLink className="fas" />
                  </span>{' '}
                  Courses
                </Link>
              </li>
              <li>
                <Link to={'/movies'}>
                  <span className="icon">
                    <FaVideo className="fas" />
                  </span>{' '}
                  Movies
                </Link>
              </li>
              {/* <li>
                <a href="#" className="is-active">
                  <span className="icon">
                    <i className="fa fa-table"></i>
                  </span>{' '}
                  Links
                </a>
                <ul>
                  <li>
                    <a href="#">
                      <span className="icon is-small">
                        <i className="fa fa-link"></i>
                      </span>{' '}
                      Link1
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="icon is-small">
                        <i className="fa fa-link"></i>
                      </span>{' '}
                      Link2
                    </a>
                  </li>
                </ul>
              </li> */}
              {/* {isAuthenticated && (
                <li>
                  <a href="#" className="">
                    <span className="icon">
                      <i className="fa fa-info"></i>
                    </span>{' '}
                    About
                  </a>
                </li>
              )} */}
            </ul>
          </aside>
          <div className="container column is-10">
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/courses" exact>
                <IndexPage />
              </Route>
              <Route path="/course/:id/edit">
                <UpdateCourse />
              </Route>
              <Route path="/create/course" exact>
                <NewCourse />
              </Route>
              <Route path="/movies" exact>
                <Movie />
              </Route>
              <Route path="/shows" exact>
                <Shows />
              </Route>
              <Route path="/books" exact>
                <Books />
              </Route>
              <Route path="/todos" exact>
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
