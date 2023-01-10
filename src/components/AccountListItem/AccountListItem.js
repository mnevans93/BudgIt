export default function AccountListItem (props) {
  return (
    <>
      <h1>{props.nickname}</h1>
      <h2>{props.type}</h2>
      <h2>Current Balance: {props.type === 'Bank Account' ? <span>${props.currentBalance.toFixed(2)}</span> : <span className='no-stonks'>${props.currentBalance.toFixed(2)}</span>}</h2>
      <br />
    </>
  )
}
