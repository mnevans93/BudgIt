import Table from 'react-bootstrap/Table'
import Nav from 'react-bootstrap/Nav'

export default function TransactionTable (props) {
  const handleClick = (itemId, operation) => {
    if (operation === 'edit') {
      // edit code
    } else {
      // delete code
    }
  }

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
        {/* MAP A TR ELEMENT FOR EACH TRANSACTION PASSED THROUGH PROPS. TR SHOWN BELOW IS A PLACEHOLDER */}
        <tr>
          {props.renderAccEl ? <th>Account</th> : ''}
          <td>1/9/2023</td>
          <td>9,001</td>
          <td>Power level</td>
          <td>
            <Nav.Link className='options-col edit' href='#' onClick={() => handleClick('ID GOES HERE', 'edit')}>Edit</Nav.Link> | <Nav.Link className='options-col delete' href='#' onClick={() => handleClick('ID GOES HERE', 'delete')}>Delete</Nav.Link>
          </td>
        </tr>
      </tbody>
    </Table>
  )
}
