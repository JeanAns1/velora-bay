import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="page-header">
      <div className="container">
        <p className="eyebrow">404</p>
        <h1>Page not found</h1>
        <p>The page you are looking for doesn't exist or has been moved.</p>
        <Link to="/" className="btn btn-primary">
          Back to home
        </Link>
      </div>
    </section>
  )
}
