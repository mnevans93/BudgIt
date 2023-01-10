import { useState, useEffect } from 'react'
import { deleteUser } from '../../utilities/users-service'
import OptionsModal from '../../components/OptionsModal/OptionsModal'
import OptionsForm from '../../components/OptionsForm/OptionsForm'

export default function OptionsPage (props) {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [status, setStatus] = useState('')

  useEffect(() => {
    props.setPage('User Options')
  })

  const handleDelete = async () => {
    try {
      const userData = { ...props.user }
      props.setUser(await deleteUser(userData))
      props.setLink('/welcome')
      props.setPage('')
    } catch (error) {
      setStatus('Sorry, something went wrong. Try again later.')
    }
  }

  return (
    <main>
      <OptionsForm user={props.user} setUser={props.setUser} />
      <br />
      <OptionsModal show={show} handleClose={handleClose} handleShow={handleShow} handleDelete={handleDelete} user={props.user} setUser={props.setUser} />
      <br /><p className='error-message'>&nbsp;{status}</p>
    </main>
  )
}
