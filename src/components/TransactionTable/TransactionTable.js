import { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import Nav from 'react-bootstrap/Nav'

export default function TransactionTable ( {handleShow, setOperation, user, accIndex, renderAccEl, link, page} ) {
  const [transactions, setTransactions] = useState(null)

  const handleClick = (itemId, op) => {
    handleShow()
    setOperation(op)
  }

  useEffect(() => {
    setTransactions(user.accounts[accIndex].transactions.map(transaction =>
      <tr key={transaction._id}>
          {renderAccEl ? <th>{user.accounts[accIndex].nickname}</th> : ''}
          <td>{transaction.date.substr(0, 10)}</td>
          <td>{transaction.type === 'Debit' ? <span className="stonks">${transaction.value.toFixed(2)}</span> : `-$${transaction.value.toFixed(2)}`}</td>
          <td>{transaction.description}</td>
          <td>
            <Nav.Link className='options-col edit' href='#' onClick={() => handleClick(transaction._id, 'edit')}>Edit</Nav.Link> | <Nav.Link className='options-col delete' href='#' onClick={() => handleClick(transaction._id, 'delete')}>Delete</Nav.Link>
          </td>
      </tr>
    ))
  }, [user, link, page])

  return (
    <Table bordered hover>
      <thead>
        <tr>
          {renderAccEl ? <th>Account</th> : ''}
          <th>Date</th>
          <th>Value</th>
          <th>Description</th>
          <th>Options</th>
        </tr>
      </thead>
      <tbody>
        {transactions}
      </tbody>
    </Table>
  )
}
