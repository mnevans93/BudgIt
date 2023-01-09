import { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import Nav from 'react-bootstrap/Nav'

export default function TransactionTable (props) {
  const [transactions, setTransactions] = useState(null)
  
  const handleClick = (itemId, operation) => {
    if (operation === 'edit') {
      // edit code
    } else {
      // delete code
    }
  }

  useEffect(() => {
    setTransactions(props.user.accounts[props.accIndex].transactions.map(transaction =>
      <tr key={transaction._id}>
          {props.renderAccEl ? <th>{props.user.accounts[props.accIndex].nickname}</th> : ''}
          <td>{transaction.date.substr(0, 10)}</td>
          <td>{transaction.type === 'Debit' ? <span className="stonks">{transaction.value.toFixed(2)}</span> : `-${transaction.value.toFixed(2)}`}</td>
          <td>{transaction.description}</td>
          <td>
            <Nav.Link className='options-col edit' href='#' onClick={() => handleClick(transaction._id, 'edit')}>Edit</Nav.Link> | <Nav.Link className='options-col delete' href='#' onClick={() => handleClick(transaction._id, 'delete')}>Delete</Nav.Link>
          </td>
      </tr>
    ))
  }, [props.user, props.link, props.page])

  return (
    <Table bordered hover>
      <thead>
        <tr>
          {props.renderAccEl ? <th>Account</th> : ''}
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
