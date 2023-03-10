import { useState, useEffect } from 'react'
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
  const navigate = useNavigate()
  const [user, setUser] = useState(getUser())
  const [page, setPage] = useState('My Dashboard')
  const [link, setLink] = useState('/welcome')
  const [status, setStatus] = useState('')

  const handleClick = (e, link) => {
    e.preventDefault()
    setLink(link)
  }

  useEffect(() => {
    if (!user) navigate('/')
  },[])

  return (
    <main className='App'>
      {user
        ? <>
          <NavBar user={user} setUser={setUser} page={page} link={link} setLink={setLink} navigate={navigate} handleClick={handleClick} />
          <Routes>
            <Route path='/dashboard' element={<DashboardPage page={page} setPage={setPage} user={user} setUser={setUser} setLink={setLink} navigate={navigate} getUser={getUser} status={status} setStatus={setStatus} />} />
            <Route path='/accounts/new' element={<NewAccountPage page={page} setPage={setPage} link={link} setLink={setLink} user={user} setUser={setUser} status={status} setStatus={setStatus} />} />
            <Route path='/accounts/*' element={<AccountPage link={link} setLink={setLink} page={page} setPage={setPage} user={user} setUser={setUser} navigate={navigate} status={status} setStatus={setStatus} />} />
            <Route path='/options' element={<OptionsPage link={link} setLink={setLink} navigate={navigate} page={page} setPage={setPage} user={user} setUser={setUser} />} />
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
