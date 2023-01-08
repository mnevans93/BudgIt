import React, { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { getUser } from '../../utilities/users-service'
import NavBar from '../../components/NavBar/NavBar'
import DashboardPage from '../DashboardPage/DashboardPage'
import AccountPage from '../AccountPage/AccountPage'
import NewAccountPage from '../NewAccountPage/NewAccountPage'
import OptionsPage from '../OptionsPage/OptionsPage'
import AuthPage from '../AuthPage/AuthPage'
import WelcomePage from '../WelcomePage/WelcomePage'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss'

export default function App () {
  const [user, setUser] = useState(getUser())
  const [page, setPage] = useState("My Dashboard")

  return (
    <main className='App'>
      {user
        ? <>
          <NavBar user={user} setUser={setUser} page={page} setPage={setPage} />
          <Routes>
            <Route path='/dashboard' element={<DashboardPage page={page} setPage={setPage} />} />
            <Route path='/accounts/new' element={<NewAccountPage page={page} setPage={setPage} />} />
            <Route path='/accounts' element={<AccountPage page={page} setPage={setPage} />} />
            <Route path='/options' element={<OptionsPage page={page} setPage={setPage} />} />
            <Route path='/*' element={<Navigate to='/dashboard' />} />
          </Routes>
        </>
        : <Routes>
            <Route path='/signup' element={<AuthPage setUser={setUser} form='signup' />} />
            <Route path='/login' element={<AuthPage setUser={setUser} form='login' />} />
            <Route path='/welcome' element={<WelcomePage />} />
            <Route path='/*' element={<Navigate to='/welcome' />} />
          </Routes>}
    </main>
  )
}
