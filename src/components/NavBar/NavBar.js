import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { logOut } from '../../utilities/users-service'

export default function NavBar (props) {
  const [loggedOut, setLoggedOut] = useState(false)

  const handleLogout = () => {
    props.setUser(null)
    logOut()
    setLoggedOut(true)
  }

  return (
    loggedOut
      ? <Navigate to='/login' />
      : <>
        <button onClick={handleLogout}> LOGOUT</button>
      </>
  )
}
