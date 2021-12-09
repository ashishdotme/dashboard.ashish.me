import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import { useAuth0 } from '@auth0/auth0-react'

const ProtectedRoute = ({ component: Component, role, ...args }) => {
  const { user } = useAuth0()
  let isAdmin = false
  if (user && user['https://ncirl.me/role']) {
    const roles = user['https://ncirl.me/role']
    const isAdminRolePresent = roles.find((x) => x === 'Professor')
    isAdmin = isAdminRolePresent ? true : false
  }
  return (
    <Route
      render={(props) => {
        if (role === 'Professor') {
          if (isAdmin) {
            return <Component {...props} />
          } else {
            return <Redirect to={{ pathname: '/access', state: { from: props.location } }} />
          }
        }
        return <Component {...props} />
      }}
      {...args}
    />
  )
}

export default withAuthenticationRequired(ProtectedRoute, {
  onRedirecting: () => <h2>Loading</h2>,
})
