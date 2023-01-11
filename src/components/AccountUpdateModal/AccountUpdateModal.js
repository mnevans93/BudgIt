import { useState, useEffect } from 'react'
import validInput from '../../utilities/check-input'
import { update } from '../../utilities/users-service'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

export default function AccountUpdateModal ({ show, handleShow, handleClose, user, setUser, account, accIndex, link }) {
    const [nickname, setNickname] = useState('')
    const [status, setStatus] = useState('')

    useEffect(() => {
      setNickname(account.nickname)
      setStatus('')
    }, [account, link])
    
    const handleClick = () => {
        if (nickname === account.nickname) {
            handleClose()
            return
        }
        if (!checkIfUnique()) {
            setStatus('You already have an account with that nickname. No updates were made.')
            return
        }
        accountUpdate()
        handleClose()
    }

    const handleChange = (event) => {
        if (validInput(event, 'nickname')) {
            setNickname(event.target.value)
        }
    }

    const accountUpdate = async () => {
        try {
          const userData = {...user}
          userData.accounts[accIndex].nickname = nickname
          setUser(await update(userData))
          setStatus('')
        } catch (error) {
          setStatus('Sorry, something went wrong. Try again later.')
        }
    }

    const checkIfUnique = () => {
        for (const acc in user.accounts) {
          if (nickname === user.accounts[acc].nickname) {
            return false
          }
        }
        return true
    }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        CHANGE NICKNAME
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Account Nickname</Modal.Title>
        </Modal.Header>
        <Form>
            <Form.Group className='mb-3' controlId='formNickname'>
                <Form.Label className='hide-sm'>Nickname</Form.Label>
                <Form.Control type='text' name='nickname' value={nickname} onChange={handleChange} />
            </Form.Group>
        </Form>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            CANCEL
          </Button>
          <Button variant="primary" onClick={handleClick} >
            SAVE CHANGES
          </Button>
          <br /><br /> <h4>&nbsp;{status}</h4>
        </Modal.Footer>
      </Modal>
    </>
  )
}
