import { useState, useEffect } from 'react'
import { redirect } from 'react-router-dom'
import { signUp } from '../../utilities/users-service'
import validInput from '../../utilities/check-input'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default function SignUpForm ({ setUser, link, navigate, handleClick }) {
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    accounts: [],
    confirm: '',
    error: ''
  })
  useEffect(() => {
    navigate(link)
  }, [link])

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const formData = { ...credentials }
      delete formData.error
      delete formData.confirm
      const user = await signUp(formData)
      setUser(user)
      if (user) return redirect('/dashboard')
    } catch (error) {
      setCredentials({ error: 'Signup Failed' })
    }
  }

  const handleChange = (event) => {
    if (validInput(event, 'name')) {
      setCredentials({
        ...credentials,
        [event.target.name]: event.target.value
      })
    }
  }

  const disable = credentials.password ? (credentials.password !== credentials.confirm) : true

  return (
    <>
      <h1>Welcome to BudgIt! Sign up to get started.</h1>
      <br />
      <Form className='text-center' onSubmit={handleSubmit}>
        <Form.Group className='mb-3' controlId='formBasic'>
          <Form.Label>Name</Form.Label>
          <Form.Control type='text' name='name' value={credentials.name} onChange={handleChange} placeholder='Enter your name' required />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Email</Form.Label>
          <Form.Control type='email' name='email' value={credentials.email} onChange={handleChange} placeholder='Enter your email' required />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' name='password' value={credentials.password} onChange={handleChange} placeholder='Password' required />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicConfirm'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type='password' name='confirm' value={credentials.confirm} onChange={handleChange} placeholder='Confirm password' required />
        </Form.Group>
        <Button variant='primary' type='submit' disabled={disable}>SIGN UP</Button>
        <br /><p className='error-message'>&nbsp;{credentials.error}</p>
      </Form>
      <h3>Already have an account?</h3>
      <Button href='/login' onClick={(e) => handleClick(e, '/login')}>LOGIN</Button>
    </>
  )
}
