import { useEffect, useState } from 'react';

const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

function getItems(payload) {
  return Array.isArray(payload) ? payload : payload?.results || [];
}

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');
  const [selectedTeam, setSelectedTeam] = useState(null);

  useEffect(() => {
    console.log('[Teams] REST endpoint:', endpoint);
    fetch(endpoint).then((response) => { if (!response.ok) throw new Error(`HTTP ${response.status}`); return response.json(); }).then((payload) => { console.log('[Teams] Dados obtidos:', payload); setTeams(getItems(payload)); }).catch((requestError) => setError(requestError.message));
  }, []);

  return <section className="data-section"><p className="eyebrow">Comunidade</p><h1 className="display-5 fw-bold mb-4">Equipes</h1>{error && <div className="alert alert-danger" role="alert">Não foi possível carregar: {error}</div>}<div className="card data-card"><div className="card-header d-flex justify-content-between align-items-center"><h2 className="h5 mb-0">Equipes ativas</h2><span className="badge text-bg-success">{teams.length} equipes</span></div><div className="table-responsive"><table className="table table-hover"><thead><tr><th scope="col">Equipe</th><th scope="col">Descrição</th><th scope="col">Participantes</th><th scope="col" className="text-end">Ações</th></tr></thead><tbody>{teams.map((team, index) => <tr key={team.id || index}><th scope="row">{team.name || 'Equipe'}</th><td>{team.description || 'Equipe OctoFit'}</td><td>{team.members?.length ?? team.member_count ?? 0}</td><td className="text-end"><button className="btn btn-sm btn-outline-success" type="button" data-bs-toggle="modal" data-bs-target="#teamDetails" onClick={() => setSelectedTeam(team)}>Detalhes</button></td></tr>)}</tbody></table></div>{!error && teams.length === 0 && <p className="text-secondary text-center my-4">Nenhuma equipe encontrada.</p>}</div><div className="modal fade" id="teamDetails" tabIndex="-1" aria-labelledby="teamDetailsTitle" aria-hidden="true"><div className="modal-dialog modal-dialog-centered"><div className="modal-content"><div className="modal-header"><h2 className="modal-title h5" id="teamDetailsTitle">Detalhes da equipe</h2><button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fechar" /></div><div className="modal-body">{selectedTeam && <dl className="row mb-0">{Object.entries(selectedTeam).map(([key, value]) => <><dt className="col-sm-4 text-capitalize" key={`${key}-label`}>{key.replaceAll('_', ' ')}</dt><dd className="col-sm-8" key={key}>{String(value ?? 'Não informado')}</dd></>)}</dl>}</div></div></div></div></section>;
}

export default Teams;