import SignUpForm from '../../components/SignUpForm/SignUpForm'
import LoginForm from '../../components/LoginForm/LoginForm'

export default function AuthPage ({ setUser, form, link, setLink, navigate, handleClick }) {
  return (
    <main className="auth">
      {form === 'signup'
        ? <SignUpForm setUser={setUser} link={link} setLink={setLink} navigate={navigate} handleClick={handleClick} />
        : <LoginForm setUser={setUser} link={link} setLink={setLink} navigate={navigate} handleClick={handleClick} />}
    </main>
  )
}
