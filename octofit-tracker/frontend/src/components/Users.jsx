import { fetchCollection } from '../api.js'
import { ResourceState } from './ResourceState.jsx'
import { useResource } from './useResource.js'

function Users() {
  const { data, loading, error } = useResource('users', fetchCollection)
  return <section className="resource-page"><div className="section-heading"><div><p className="eyebrow">THE COMMUNITY</p><h1>Users</h1></div><span className="record-count">{data.length} athletes</span></div><ResourceState empty={!data.length} error={error} loading={loading}><div className="card-grid">{data.map((user) => <article className="data-card" key={user._id}><p className="card-index">@{user.username}</p><h2>{user.displayName}</h2><p>{user.email}</p></article>)}</div></ResourceState></section>
}

export default Users