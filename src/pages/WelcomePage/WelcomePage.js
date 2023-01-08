import { useEffect } from 'react'
import Button from 'react-bootstrap/Button'

export default function WelcomePage (props) {
    useEffect(() => {
        if (props.link !== '/welcome') props.navigate(props.link)
    }, [props.link])
    
    return (
        <>
            <h1>Welcome to BudgIt!</h1>
            <hr />
            <h2>BudgIt is a free, simple, and fast expense tracker app. Get started today!</h2>
            <br />
            <div className="button-wrapper">
                <Button href="/signup" onClick={(e) => props.handleClick(e, '/signup')}>SIGN UP</Button>
                <br /><br />
                <Button href="/login" onClick={(e) => props.handleClick(e, '/login')}>LOGIN</Button>
            </div>
        </>
    )
}
