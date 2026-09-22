import { useEffect, useState } from 'react';

const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

function getItems(payload) {
  return Array.isArray(payload) ? payload : payload?.results || [];
}

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');
  const [selectedActivity, setSelectedActivity] = useState(null);

  useEffect(() => {
    console.log('[Activities] REST endpoint:', endpoint);
    fetch(endpoint)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((payload) => {
        console.log('[Activities] Dados obtidos:', payload);
        setActivities(getItems(payload));
      })
      .catch((requestError) => setError(requestError.message));
  }, []);

  return <section className="data-section"><p className="eyebrow">Movimento</p><h1 className="display-5 fw-bold mb-4">Atividades</h1>{error && <div className="alert alert-danger" role="alert">Não foi possível carregar: {error}</div>}<div className="card data-card"><div className="card-header d-flex justify-content-between align-items-center"><h2 className="h5 mb-0">Registros recentes</h2><span className="badge text-bg-success">{activities.length} registros</span></div><div className="table-responsive"><table className="table table-hover"><thead><tr><th scope="col">Atividade</th><th scope="col">Duração</th><th scope="col">Data</th><th scope="col" className="text-end">Ações</th></tr></thead><tbody>{activities.map((activity, index) => <tr key={activity.id || index}><th scope="row">{activity.activity_type || activity.name || 'Atividade'}</th><td>{activity.duration ? `${activity.duration} min` : 'Não informado'}</td><td>{activity.date || activity.created_at || 'Não informado'}</td><td className="text-end"><button className="btn btn-sm btn-outline-success" type="button" data-bs-toggle="modal" data-bs-target="#activityDetails" onClick={() => setSelectedActivity(activity)}>Detalhes</button></td></tr>)}</tbody></table></div>{!error && activities.length === 0 && <p className="text-secondary text-center my-4">Nenhuma atividade encontrada.</p>}</div><div className="modal fade" id="activityDetails" tabIndex="-1" aria-labelledby="activityDetailsTitle" aria-hidden="true"><div className="modal-dialog modal-dialog-centered"><div className="modal-content"><div className="modal-header"><h2 className="modal-title h5" id="activityDetailsTitle">Detalhes da atividade</h2><button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fechar" /></div><div className="modal-body">{selectedActivity && <dl className="row mb-0">{Object.entries(selectedActivity).map(([key, value]) => <><dt className="col-sm-4 text-capitalize" key={`${key}-label`}>{key.replaceAll('_', ' ')}</dt><dd className="col-sm-8" key={key}>{String(value ?? 'Não informado')}</dd></>)}</dl>}</div></div></div></div></section>;
}

export default Activities;