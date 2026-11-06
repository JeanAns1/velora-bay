export default function Picture({ type = 'sea', className = '', style }) {
  const variant = type === 'sea' ? '' : `picture--${type}`
  return <div className={`picture ${variant} ${className}`} style={style} role="img" aria-hidden="true" />
}
