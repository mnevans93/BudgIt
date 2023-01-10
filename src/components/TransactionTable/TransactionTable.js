import { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import Nav from 'react-bootstrap/Nav'

export default function TransactionTable ( {handleClick, user, accIndex, renderAccEl, link, page} ) {
  const [transactions, setTransactions] = useState(null)

  const sortAndMap = () => {
    // const userData = {...user}
    return user.accounts[accIndex].transactions.map(element =>
      <tr key={element._id}>
          {renderAccEl ? <th>{user.accounts[accIndex].nickname}</th> : ''}
          <td>{element.date.substr(0, 10)}</td>
          <td>{element.type === 'Debit' ? <span className="stonks">${element.value.toFixed(2)}</span> : `-$${element.value.toFixed(2)}`}</td>
          <td>{element.description}</td>
          <td>
            <Nav.Link className='options-col' href='#' onClick={() => handleClick(element, 'edit')}>EDIT</Nav.Link> &nbsp; <Nav.Link className='options-col' href='#' onClick={() => handleClick(element, 'delete')}>DELETE</Nav.Link>
          </td>
      </tr>
    )
  }

  useEffect(() => {
    setTransactions(sortAndMap)
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
