import SignUpForm from '../../components/SignUpForm/SignUpForm'
import LoginForm from '../../components/LoginForm/LoginForm'

export default function AuthPage (props) {
  return (
    <main>
      {props.form === 'signup' ? <SignUpForm setUser={props.setUser} /> : <LoginForm setUser={props.setUser} />}
    </main>
  )
}
