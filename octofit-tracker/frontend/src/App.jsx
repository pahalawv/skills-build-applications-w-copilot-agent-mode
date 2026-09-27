import { NavLink, Route, Routes, useLocation } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [
  { label: 'Overview', path: '/' },
  { label: 'Activities', path: '/activities' },
  { label: 'Leaderboard', path: '/leaderboard' },
  { label: 'Teams', path: '/teams' },
  { label: 'Users', path: '/users' },
  { label: 'Workouts', path: '/workouts' },
]

function Overview() {
  return (
    <section className="overview-page">
      <div className="intro-panel">
        <p className="eyebrow">OCTOFIT TRACKER</p>
        <h1>Small steps. Strong teams.</h1>
        <p className="intro-copy">A shared space for movement, momentum, and a little friendly competition.</p>
        <NavLink className="primary-action" to="/activities">Log an activity <span aria-hidden="true">-&gt;</span></NavLink>
      </div>
      <div className="overview-grid">
        {navigation.slice(1).map(({ label, path }) => (
          <NavLink className="overview-link" key={path} to={path}>
            <span>{label}</span><span aria-hidden="true">-&gt;</span>
          </NavLink>
        ))}
      </div>
    </section>
  )
}

function App() {
  const location = useLocation()
  const currentPage = navigation.find((item) => item.path === location.pathname)?.label || 'OctoFit Tracker'

  return (
    <div className="app-shell">
      <header className="site-header">
        <NavLink className="brand" to="/" aria-label="OctoFit Tracker home">
          <img src="/octofitapp-small.png" alt="" />
          <span>OctoFit <em>Tracker</em></span>
        </NavLink>
        <nav className="main-nav" aria-label="Main navigation">
          {navigation.map(({ label, path }) => (
            <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} end={path === '/'} key={path} to={path}>
              {label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="content-wrap">
        {location.pathname !== '/' && <p className="page-kicker">/ {currentPage}</p>}
        <Routes>
          <Route element={<Overview />} path="/" />
          <Route element={<Activities />} path="/activities" />
          <Route element={<Leaderboard />} path="/leaderboard" />
          <Route element={<Teams />} path="/teams" />
          <Route element={<Users />} path="/users" />
          <Route element={<Workouts />} path="/workouts" />
          <Route element={<Overview />} path="*" />
        </Routes>
      </main>
    </div>
  )
}

export default App
