import { useEffect } from 'react'
import Button from 'react-bootstrap/Button'

export default function WelcomePage ({ link, navigate, handleClick }) {
  useEffect(() => {
    if (link !== '/welcome') navigate(link)
  }, [link])

  return (
    <main className="static">
      <h1>Welcome to BudgIt!</h1>
      <h2>BudgIt is a free, simple, and fast expense tracker app. Get started today!</h2>
      <br />
      <div className='button-wrapper'>
        <Button href='/signup' onClick={(e) => handleClick(e, '/signup')}>SIGN UP</Button>
        <br /><br />
        <Button href='/login' onClick={(e) => handleClick(e, '/login')}>LOGIN</Button>
      </div>
      <br /><br /><br />
      <Button href='https://github.com/mnevans93'>CLICK HERE TO CHECK OUT MY GITHUB!</Button>
    </main>
  )
}
