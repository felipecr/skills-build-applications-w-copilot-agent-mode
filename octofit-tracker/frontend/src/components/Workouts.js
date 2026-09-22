import { useEffect, useState } from 'react';

const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

function getItems(payload) {
  return Array.isArray(payload) ? payload : payload?.results || [];
}

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  useEffect(() => {
    console.log('[Workouts] REST endpoint:', endpoint);
    fetch(endpoint).then((response) => { if (!response.ok) throw new Error(`HTTP ${response.status}`); return response.json(); }).then((payload) => { console.log('[Workouts] Dados obtidos:', payload); setWorkouts(getItems(payload)); }).catch((requestError) => setError(requestError.message));
  }, []);

  return <section className="data-section"><p className="eyebrow">Plano pessoal</p><h1 className="display-5 fw-bold mb-4">Treinos</h1>{error && <div className="alert alert-danger" role="alert">Não foi possível carregar: {error}</div>}<div className="card data-card"><div className="card-header d-flex justify-content-between align-items-center"><h2 className="h5 mb-0">Treinos disponíveis</h2><span className="badge text-bg-success">{workouts.length} treinos</span></div><div className="table-responsive"><table className="table table-hover"><thead><tr><th scope="col">Treino</th><th scope="col">Descrição</th><th scope="col">Duração</th><th scope="col" className="text-end">Ações</th></tr></thead><tbody>{workouts.map((workout, index) => <tr key={workout.id || index}><th scope="row">{workout.name || workout.title || 'Treino'}</th><td>{workout.description || workout.type || 'Treino personalizado'}</td><td>{workout.duration ? `${workout.duration} min` : 'Não informado'}</td><td className="text-end"><button className="btn btn-sm btn-outline-success" type="button" data-bs-toggle="modal" data-bs-target="#workoutDetails" onClick={() => setSelectedWorkout(workout)}>Detalhes</button></td></tr>)}</tbody></table></div>{!error && workouts.length === 0 && <p className="text-secondary text-center my-4">Nenhum treino encontrado.</p>}</div><div className="modal fade" id="workoutDetails" tabIndex="-1" aria-labelledby="workoutDetailsTitle" aria-hidden="true"><div className="modal-dialog modal-dialog-centered"><div className="modal-content"><div className="modal-header"><h2 className="modal-title h5" id="workoutDetailsTitle">Detalhes do treino</h2><button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fechar" /></div><div className="modal-body">{selectedWorkout && <dl className="row mb-0">{Object.entries(selectedWorkout).map(([key, value]) => <><dt className="col-sm-4 text-capitalize" key={`${key}-label`}>{key.replaceAll('_', ' ')}</dt><dd className="col-sm-8" key={key}>{String(value ?? 'Não informado')}</dd></>)}</dl>}</div></div></div></div></section>;
}

export default Workouts;