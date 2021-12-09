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
    <nav className="navbar is-warning is-fixed-top" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item has-text-info-dark" to="/">
          <i className="fas fa-blog"></i>
          <span>NCI</span>
        </Link>

        <Burger active={isActive} setIsActive={setIsActice} />
      </div>

      <div className={`navbar-menu ${isActive ? 'is-active' : ''}`} id="navbarMenuMain">
        <div className="navbar-start">
          <div className="navbar-item has-dropdown is-hoverable">
            <div className="navbar-link">Course</div>

            <div className="navbar-dropdown">
              <Link to="/cloud" className="navbar-item">
                Cloud Architecture
              </Link>
              <Link to="/post?m=popular" className="navbar-item">
                Cloud Devops
              </Link>
              <Link to="/post?m=popular" className="navbar-item">
                Blockchain
              </Link>
              <Link to="/post?m=popular" className="navbar-item">
                Cloud Platform Programming
              </Link>
              <hr className="navbar-divider" />
              <Link to="/post/search" className="navbar-item">
                Help
              </Link>
            </div>
          </div>
        </div>

        <div className="navbar-end">
          {!isAuthenticated && (
            <a className="navbar-item" onClick={() => loginWithRedirect()}>
              Login
            </a>
          )}
          {isAuthenticated && (
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
                      Movie
                    </Link>
                    <Link to="/post/search" className="navbar-item">
                      Books
                    </Link>
                  </>
                )}
                <Link to="/post?m=popular" className="navbar-item">
                  Shows
                </Link>
              </div>
            </div>
          )}
          {isAuthenticated && (
            <a className="navbar-item" onClick={() => logout({ returnTo: window.location.origin })}>
              Logout
            </a>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
