import { fetchCollection } from '../api.js'
import { ResourceState } from './ResourceState.jsx'
import { useResource } from './useResource.js'

function Leaderboard() {
  const { data, loading, error } = useResource('leaderboard', fetchCollection)
  return <section className="resource-page"><div className="section-heading"><div><p className="eyebrow">ALL-TIME RANKINGS</p><h1>Leaderboard</h1></div></div><ResourceState empty={!data.length} error={error} loading={loading}><div className="leaderboard-list">{data.map((entry, index) => <div className="leaderboard-row" key={entry._id}><span className="rank">{String(index + 1).padStart(2, '0')}</span><span className="leader-name"><strong>{entry.displayName}</strong><small>{entry.participantType}</small></span><strong className="points">{entry.points}<small> pts</small></strong></div>)}</div></ResourceState></section>
}

export default Leaderboard