import { useState } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
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
  let navigate = useNavigate()
  const [user, setUser] = useState(getUser())
  const [page, setPage] = useState('My Dashboard')
  const [link, setLink] = useState('/welcome')
    
  const handleClick = (e, link) => {
      console.log(user)
      e.preventDefault()
      setLink(link)
  }

  return (
    <main className='App'>
      {user
        ? <>
          <NavBar user={user} setUser={setUser} page={page} link={link} setLink={setLink} navigate={navigate} handleClick={handleClick} />
          <Routes>
            <Route path='/dashboard' element={<DashboardPage page={page} setPage={setPage} user={user} setUser={setUser} getUser={getUser} />} />
            <Route path='/accounts/new' element={<NewAccountPage page={page} setPage={setPage} user={user} setUser={setUser} />} />
            <Route path='/accounts/*' element={<AccountPage page={page} setPage={setPage} user={user} setUser={setUser} link={link} />} />
            <Route path='/options' element={<OptionsPage page={page} setPage={setPage} user={user} setUser={setUser} />} />
            <Route path='/*' element={<Navigate to='/dashboard' />} />
          </Routes>
        </>
        : <Routes>
            <Route path='/signup' element={<AuthPage setUser={setUser} form='signup' link={link} setLink={setLink} navigate={navigate} handleClick={handleClick} />} />
            <Route path='/login' element={<AuthPage setUser={setUser} form='login' link={link} setLink={setLink} navigate={navigate} handleClick={handleClick} />} />
            <Route path='/welcome' element={<WelcomePage link={link} setLink={setLink} handleClick={handleClick} navigate={navigate} />} />
            <Route path='/*' element={<Navigate to='/welcome' />} />
          </Routes>}
    </main>
  )
}
