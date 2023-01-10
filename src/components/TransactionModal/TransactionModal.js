import { useState } from 'react'
import validInput from '../../utilities/check-input'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'

export default function TransactionModal ({ operation, show, handleClose, handleEdit, handleDelete, updateData, setUpdateData }) {
    const handleClick = () => {
        handleClose()
        operation === 'edit' ? handleEdit() : handleDelete()
    }

    const [disable, setDisable] = useState(false)

    const handleChange = (event) => {
        if (validInput(event, 'description')) {
            setUpdateData({
            ...updateData,
            [event.target.name]: event.target.value
            })
        }
        if (updateData.date && updateData.value && updateData.type) {
          setDisable(false)
        } else { setDisable(true) }
    }
    
    return (
        operation === 'delete'
            ? 
            <>
                <Modal show={show} onHide={handleClose} theme="primary" >
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Transaction</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete this transaction? This cannot be undone.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleClose}>CANCEL</Button> 
                        <Button variant="primary" onClick={handleClick}>DELETE</Button>
                    </Modal.Footer>
                </Modal>
            </>
            :
            <>
                <Modal show={show} onHide={handleClose} size="lg" theme="primary" >
                    <Modal.Header closeButton>
                        <Modal.Title>Update Transaction</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form className='transaction'>
                        <Row>
                            <Form.Group className='mb-3' controlId='formDate'>
                                <Form.Label className='hide-sm'>Date</Form.Label>
                                <Form.Control type='date' name='date' value={updateData.date.substr(0, 10)} onChange={handleChange} />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group className='mb-3' controlId='formDescription'>
                                <Form.Label className='hide-sm'>Type</Form.Label>
                                <Form.Select name='type' value={updateData.type} onChange={handleChange} required>
                                    <option />
                                    <option>Charge</option>
                                    <option>Debit</option>
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group className='mb-3' controlId='formValue'>
                                <Form.Label className='hide-sm'>Value</Form.Label>
                                <Form.Control type='number' name='value' value={updateData.value} onChange={handleChange} />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group className='mb-3' controlId='formDescription'>
                                <Form.Label className='hide-sm'>Description</Form.Label>
                                <Form.Control type='text' name='description' value={updateData.description} onChange={handleChange} />
                            </Form.Group>
                        </Row>
                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleClose}>CANCEL</Button>
                        <Button variant="primary" onClick={handleClick} disabled={disable}>SAVE CHANGES</Button>
                    </Modal.Footer>
                </Modal>
            </>
    )
}
