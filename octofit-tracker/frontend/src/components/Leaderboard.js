import { useEffect, useState } from 'react';

const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

function getItems(payload) {
  return Array.isArray(payload) ? payload : payload?.results || [];
}

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');
  const [selectedEntry, setSelectedEntry] = useState(null);

  useEffect(() => {
    console.log('[Leaderboard] REST endpoint:', endpoint);
    fetch(endpoint).then((response) => { if (!response.ok) throw new Error(`HTTP ${response.status}`); return response.json(); }).then((payload) => { console.log('[Leaderboard] Dados obtidos:', payload); setEntries(getItems(payload)); }).catch((requestError) => setError(requestError.message));
  }, []);

  return <section className="data-section"><p className="eyebrow">Competição</p><h1 className="display-5 fw-bold mb-4">Placar de líderes</h1>{error && <div className="alert alert-danger" role="alert">Não foi possível carregar: {error}</div>}<div className="card data-card"><div className="card-header d-flex justify-content-between align-items-center"><h2 className="h5 mb-0">Classificação</h2><span className="badge text-bg-warning">{entries.length} atletas</span></div><div className="table-responsive"><table className="table table-hover"><thead><tr><th scope="col">Posição</th><th scope="col">Atleta</th><th scope="col">Pontos</th><th scope="col" className="text-end">Ações</th></tr></thead><tbody>{entries.map((entry, index) => <tr key={entry.id || index}><th scope="row"><span className="rank">#{entry.rank || index + 1}</span></th><td>{entry.user || entry.username || entry.name || 'Atleta'}</td><td>{entry.points ?? entry.score ?? 0}</td><td className="text-end"><button className="btn btn-sm btn-outline-success" type="button" data-bs-toggle="modal" data-bs-target="#leaderboardDetails" onClick={() => setSelectedEntry(entry)}>Detalhes</button></td></tr>)}</tbody></table></div>{!error && entries.length === 0 && <p className="text-secondary text-center my-4">Nenhum resultado encontrado.</p>}</div><div className="modal fade" id="leaderboardDetails" tabIndex="-1" aria-labelledby="leaderboardDetailsTitle" aria-hidden="true"><div className="modal-dialog modal-dialog-centered"><div className="modal-content"><div className="modal-header"><h2 className="modal-title h5" id="leaderboardDetailsTitle">Detalhes do atleta</h2><button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fechar" /></div><div className="modal-body">{selectedEntry && <dl className="row mb-0">{Object.entries(selectedEntry).map(([key, value]) => <><dt className="col-sm-4 text-capitalize" key={`${key}-label`}>{key.replaceAll('_', ' ')}</dt><dd className="col-sm-8" key={key}>{String(value ?? 'Não informado')}</dd></>)}</dl>}</div></div></div></div></section>;
}

export default Leaderboard;