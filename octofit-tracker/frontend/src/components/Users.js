import { useEffect, useState } from 'react';

const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

function getItems(payload) {
  return Array.isArray(payload) ? payload : payload?.results || [];
}

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    console.log('[Users] REST endpoint:', endpoint);
    fetch(endpoint).then((response) => { if (!response.ok) throw new Error(`HTTP ${response.status}`); return response.json(); }).then((payload) => { console.log('[Users] Dados obtidos:', payload); setUsers(getItems(payload)); }).catch((requestError) => setError(requestError.message));
  }, []);

  return <section className="data-section"><p className="eyebrow">Perfil</p><h1 className="display-5 fw-bold mb-4">Usuários</h1>{error && <div className="alert alert-danger" role="alert">Não foi possível carregar: {error}</div>}<div className="card data-card"><div className="card-header d-flex justify-content-between align-items-center"><h2 className="h5 mb-0">Membros cadastrados</h2><span className="badge text-bg-success">{users.length} usuários</span></div><div className="table-responsive"><table className="table table-hover"><thead><tr><th scope="col">Usuário</th><th scope="col">E-mail</th><th scope="col">Nome</th><th scope="col" className="text-end">Ações</th></tr></thead><tbody>{users.map((user, index) => <tr key={user.id || index}><th scope="row">{user.username || user.name || 'Usuário'}</th><td>{user.email || 'Não informado'}</td><td>{[user.first_name, user.last_name].filter(Boolean).join(' ') || 'Não informado'}</td><td className="text-end"><button className="btn btn-sm btn-outline-success" type="button" data-bs-toggle="modal" data-bs-target="#userDetails" onClick={() => setSelectedUser(user)}>Detalhes</button></td></tr>)}</tbody></table></div>{!error && users.length === 0 && <p className="text-secondary text-center my-4">Nenhum usuário encontrado.</p>}</div><div className="modal fade" id="userDetails" tabIndex="-1" aria-labelledby="userDetailsTitle" aria-hidden="true"><div className="modal-dialog modal-dialog-centered"><div className="modal-content"><div className="modal-header"><h2 className="modal-title h5" id="userDetailsTitle">Detalhes do usuário</h2><button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fechar" /></div><div className="modal-body">{selectedUser && <dl className="row mb-0">{Object.entries(selectedUser).map(([key, value]) => <><dt className="col-sm-4 text-capitalize" key={`${key}-label`}>{key.replaceAll('_', ' ')}</dt><dd className="col-sm-8" key={key}>{String(value ?? 'Não informado')}</dd></>)}</dl>}</div></div></div></div></section>;
}

export default Users;