import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { demoAccount, login } from './auth'
import './admin.css'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (login(email.trim(), password)) {
      navigate(location.state?.from || '/admin', { replace: true })
    } else {
      setError('Wrong email or password')
    }
  }

  const fillDemo = () => {
    setEmail(demoAccount.email)
    setPassword(demoAccount.password)
  }

  return (
    <div className="admin-login">
      <form className="card admin-login__card" onSubmit={handleSubmit}>
        <div className="admin-login__logo">Velora Bay</div>
        <h1>Admin login</h1>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error && <p className="form-error">{error}</p>}

        <button className="btn btn-dark">Sign in</button>

        <button type="button" className="admin-login__demo" onClick={fillDemo}>
          Use demo account
        </button>
      </form>
    </div>
  )
}
