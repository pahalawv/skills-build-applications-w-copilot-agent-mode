export function ResourceState({ loading, error, empty, children }) {
  if (loading) return <p className="resource-message">Loading...</p>
  if (error) return <p className="resource-message error-message">{error}</p>
  if (empty) return <p className="resource-message">No records yet.</p>
  return children
}