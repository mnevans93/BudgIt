import { useState, useEffect } from 'react'
import { update } from '../../utilities/users-service'
import validInput from '../../utilities/check-input'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default function OptionsForm({ user, setUser }) {
    const [credentials, setCredentials] = useState({...user, password: '', confirm: ''})

    const [status, setStatus] = useState('')
    const [disable, setDisable] = useState(false)

    useEffect(() => {
        updateDisable()
    },[credentials])

    const handleSubmit = async (event) => {
        event.preventDefault()
        setStatus('')
        try {
            const userData = { ...user }
            userData.name = credentials.name
            userData.email = credentials.email
            const updatedUser = await update(userData)
            setUser(updatedUser)
            setStatus('Info updated!')
            setCredentials({
                ...credentials,
                password: '',
                confirm: ''
            })
        } catch (error) {
            setStatus('Sorry, something went wrong. Try again later.')
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

    const updateDisable = () => {
        if (credentials.password && (credentials.confirm === undefined || credentials.confirm !== credentials.password)) {
            setDisable(true)
        } else if (credentials.name === '' || credentials.email === '') {
            setDisable(true)
        } else {
            setDisable(false)
        }
    }
    
    return (
        <>
            <h1>Hi {user.name}! Looking to make changes?</h1>
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
                {/* PASSWORD EDITING FUNCTIONALITY IS CURRENTLY DISABLED */}
                {/* <Form.Group className='mb-3' controlId='formBasicPassword'>
                    <Form.Label>Update Password</Form.Label>
                    <Form.Control type='password' name='password' value={credentials.password} onChange={handleChange} placeholder='Password' required />
                </Form.Group>
                <Form.Group className='mb-3' controlId='formBasicConfirm'>
                    <Form.Label>Confirm Updated Password</Form.Label>
                    <Form.Control type='password' name='confirm' value={credentials.confirm} onChange={handleChange} placeholder='Confirm password' required />
                </Form.Group> */}
                <Button variant='primary' type='submit' disabled={disable}>UPDATE INFO</Button>
                <br /><p>&nbsp;{status}</p>
            </Form>
        </>
    )
}
