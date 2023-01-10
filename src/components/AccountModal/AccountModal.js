import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

export default function AccountModal ({ show, handleShow, handleClose, handleDelete }) {
    const handleClick = () => {
        handleClose()
        handleDelete()
    }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Delete This Account
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Account Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this account? This cannot be undone.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClick}>
            Delete Account
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
