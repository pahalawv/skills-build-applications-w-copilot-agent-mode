import { fetchCollection } from '../api.js'
import { ResourceState } from './ResourceState.jsx'
import { useResource } from './useResource.js'

function Teams() {
  const { data, loading, error } = useResource('teams', fetchCollection)
  return <section className="resource-page"><div className="section-heading"><div><p className="eyebrow">FIND YOUR CREW</p><h1>Teams</h1></div></div><ResourceState empty={!data.length} error={error} loading={loading}><div className="card-grid">{data.map((team) => <article className="data-card" key={team._id}><p className="card-index">TEAM / {String(team.members?.length || 0).padStart(2, '0')} MEMBERS</p><h2>{team.name}</h2><p>{team.description || 'Ready to move together.'}</p></article>)}</div></ResourceState></section>
}

export default Teams