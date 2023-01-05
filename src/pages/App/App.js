import React, { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { getUser } from '../../utilities/users-service'
import NavBar from '../../components/NavBar/NavBar'
import Dashboard from '../Dashboard/Dashboard'
import AuthPage from '../AuthPage/AuthPage'

export default function App () {
  const [user, setUser] = useState(getUser())

  return (
    <main className='App'>
      {user
        ? <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/*' element={<Navigate to='/dashboard' />} />
          </Routes>
        </>
        : <Routes>
          <Route path='/signup' element={<AuthPage setUser={setUser} form='signup' />} />
          <Route path='/login' element={<AuthPage setUser={setUser} form='login' />} />
          <Route path='/*' element={<Navigate to='/login' />} />
          </Routes>}
    </main>
  )
}
