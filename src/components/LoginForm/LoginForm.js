import { useState, useEffect } from 'react'
import { redirect } from 'react-router-dom'
import * as userService from '../../utilities/users-service'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default function LoginForm ({ setUser, link, navigate, handleClick }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  useEffect(() => {
    navigate(link)
  }, [link])

  const handleChange = (evt) => {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value })
    setError('')
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    try {
      const user = await userService.login(credentials)
      setUser(user)
      if (user) return redirect('/dashboard')
    } catch (error) {
      setError('Your credentials were incorrect. Try again.')
    }
  }

  const disable = credentials.password ? false : true

  return (
    <>
      <h1>Welcome back! Sign in below to pick up where you left off.</h1>
      <br />
      <Form className='text-center' onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type='email' name='email' value={credentials.email} onChange={handleChange} placeholder="Enter email" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' name='password' value={credentials.password} onChange={handleChange} placeholder="Password" required />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={disable}>LOG IN</Button>
        <br /><p className='error-message'>&nbsp;{error}</p>
      </Form>
      <h3>New to BudgIt?</h3>
      <Button href="/signup" onClick={(e) => handleClick(e, '/signup')}>SIGN UP</Button>
    </>
  )
}
