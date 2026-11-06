const labels = { paid: 'Paid', pending: 'Pending', cancelled: 'Cancelled' }

export default function StatusBadge({ status }) {
  return <span className={`badge badge--${status}`}>{labels[status] || status}</span>
}
