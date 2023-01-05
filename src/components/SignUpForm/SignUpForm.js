import { useState } from 'react'
import { redirect } from 'react-router-dom'
import { signUp } from '../../utilities/users-service'

export default function SignUpForm (props) {
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
    error: ''
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const formData = { ...credentials }
      delete formData.error
      delete formData.confirm
      const user = await signUp(formData)
      props.setUser(user)
      if (user) return redirect('/dashboard')
    } catch (error) {
      setCredentials({ error: 'Signup Failed' })
    }
  }

  const handleChange = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value
    })
  }

  const disable = credentials.password ? (credentials.password !== credentials.confirm) : true
  const signUpBtnClass = disable ? 'disabled' : ''

  return (
    <div>
      <form autoComplete='off' onSubmit={handleSubmit}>
        <label>Name</label>
        <input type='text' name='name' value={credentials.name} onChange={handleChange} required /> <br />
        <label>Email</label>
        <input type='email' name='email' value={credentials.email} onChange={handleChange} required /> <br />
        <label>Password</label>
        <input type='password' name='password' value={credentials.password} onChange={handleChange} required /> <br />
        <label>Confirm Password</label>
        <input type='password' name='confirm' value={credentials.confirm} onChange={handleChange} required /> <br />
        <button className={signUpBtnClass} type='submit' disabled={disable}>SIGN UP</button>
      </form>
      <p className='error-message'>&nbsp;{credentials.error}</p>
    </div>
  )
}
