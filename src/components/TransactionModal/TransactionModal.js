import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function EditModal ({ operation, show, handleClose, handleEdit, handleDelete }) {
    const handleClick = () => {
        handleClose()
        operation === 'edit' ? handleEdit() : handleDelete()
    }
    
    return (
        <>
            <Modal show={show} onHide={handleClose} size="lg" theme="primary" >
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="name@example.com"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Example textarea</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>Cancel</Button>
                    {operation === 'edit' ? <Button variant="primary" onClick={handleClick}>Save Changes</Button> : 
                        <Button variant="primary" onClick={handleClick}>Delete</Button>
                    }
                    
                </Modal.Footer>
            </Modal>
        </>
    )
}
