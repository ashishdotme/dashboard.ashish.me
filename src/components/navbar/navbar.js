import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
const Burger = ({ active, setIsActive }) => {
  return (
    <button
      onClick={() => {
        setIsActive(!active)
      }}
      className={`navbar-burger burger ${active ? 'is-active' : ''}`}
      aria-label="menu"
      aria-expanded="false"
      data-target="navbarMenuMain"
    >
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </button>
  )
}

const Navbar = () => {
  const [isActive, setIsActice] = useState(false)
  const { loginWithRedirect, logout, getAccessTokenSilently } = useAuth0()
  const { user, isAuthenticated } = useAuth0()
  const dispatch = useDispatch()
  let isAdmin = false
  if (user && user['https://ncirl.me/role']) {
    const roles = user['https://ncirl.me/role']
    const isAdminRolePresent = roles.find((x) => x === 'Professor')
    isAdmin = isAdminRolePresent ? true : false
  }
  useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently().then((token) => {
        localStorage.setItem('token', token)
      })
    }
  }, [isAuthenticated, getAccessTokenSilently, dispatch])
  return (
    <>
      <nav className="navbar is-info is-fixed-top" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link to={'/'} className="navbar-item">
            Home
          </Link>

          <Burger active={isActive} setIsActive={setIsActice} />
        </div>
        <div className={`navbar-menu ${isActive ? 'is-active' : ''}`} id="navbarMenuMain">
          <div className="navbar-start">
            <Link to={'/calendar'} className="navbar-item">
              Calendar
            </Link>
            <Link to={'/movies'} className="navbar-item">
              Movies
            </Link>
            <Link to={'/shows'} className="navbar-item">
              Shows
            </Link>
            <Link to={'/books'} className="navbar-item">
              Books
            </Link>
          </div>

          <div className="navbar-end">
            {!isAuthenticated && (
              <a className="navbar-item" onClick={() => loginWithRedirect()}>
                Login
              </a>
            )}
            {/* {isAuthenticated && (
              <div className="navbar-item has-dropdown is-hoverable">
                <div className="navbar-link">Admin</div>

                <div className="navbar-dropdown">
                  {isAdmin && (
                    <>
                      <Link to="/admin/course" className="navbar-item">
                        Course
                      </Link>
                      <Link to="/post?m=popular" className="navbar-item">
                        Links
                      </Link>
                      <Link to="/post?m=popular" className="navbar-item">
                        News
                      </Link>
                      <Link to="/post/search" className="navbar-item">
                        Videos
                      </Link>
                    </>
                  )}
                  <Link to="/post?m=popular" className="navbar-item">
                    Students
                  </Link>
                </div>
              </div>
            )} */}
            {isAuthenticated && (
              <a
                className="navbar-item"
                onClick={() => logout({ returnTo: window.location.origin })}
              >
                Logout
              </a>
            )}
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
