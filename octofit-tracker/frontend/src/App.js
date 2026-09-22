import './App.css';
import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark app-navbar" aria-label="Navegação principal">
          <div className="container">
            <Link className="navbar-brand d-flex align-items-center gap-2" to="/activities">
              <img className="app-logo" src="/octofitapp-small.png" alt="OctoFit Tracker" />
              <span className="fw-bold">OctoFit Tracker</span>
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavigation" aria-controls="mainNavigation" aria-expanded="false" aria-label="Abrir navegação">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="mainNavigation">
              <div className="navbar-nav ms-auto gap-lg-2">
                <Link className="nav-link" to="/activities">Atividades</Link>
                <Link className="nav-link" to="/workouts">Treinos</Link>
                <Link className="nav-link" to="/leaderboard">Placar</Link>
                <Link className="nav-link" to="/teams">Equipes</Link>
                <Link className="nav-link" to="/users">Usuários</Link>
              </div>
            </div>
          </div>
        </nav>
        <main className="container app-content">
          <Routes>
            <Route path="/activities" element={<Activities />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="*" element={<Navigate to="/activities" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
