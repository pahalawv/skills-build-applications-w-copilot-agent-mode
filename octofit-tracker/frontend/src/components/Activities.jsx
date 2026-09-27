import { fetchCollection } from '../api.js'
import { ResourceState } from './ResourceState.jsx'
import { useResource } from './useResource.js'

function Activities() {
  const { data, loading, error } = useResource('activities', fetchCollection)
  return <section className="resource-page"><div className="section-heading"><div><p className="eyebrow">MOVEMENT LOG</p><h1>Activities</h1></div><span className="record-count">{data.length} records</span></div><ResourceState empty={!data.length} error={error} loading={loading}><div className="table-wrap"><table><thead><tr><th>Type</th><th>Duration</th><th>Distance</th><th>Calories</th><th>Completed</th></tr></thead><tbody>{data.map((activity) => <tr key={activity._id}><td><strong>{activity.type}</strong></td><td>{activity.durationMinutes} min</td><td>{activity.distanceKm || 0} km</td><td>{activity.calories || 0} kcal</td><td>{new Date(activity.completedAt).toLocaleDateString()}</td></tr>)}</tbody></table></div></ResourceState></section>
}

export default Activities