import { fetchCollection } from '../api.js'
import { ResourceState } from './ResourceState.jsx'
import { useResource } from './useResource.js'

function Workouts() {
  const { data, loading, error } = useResource('workouts', fetchCollection)
  return <section className="resource-page"><div className="section-heading"><div><p className="eyebrow">PERSONALIZED SUGGESTIONS</p><h1>Workouts</h1></div></div><ResourceState empty={!data.length} error={error} loading={loading}><div className="card-grid">{data.map((workout) => <article className="data-card workout-card" key={workout._id}><div className="workout-meta"><span>{workout.category}</span><span>{workout.durationMinutes} min</span></div><h2>{workout.name}</h2><p>{workout.description}</p><small>{workout.difficulty}</small></article>)}</div></ResourceState></section>
}

export default Workouts