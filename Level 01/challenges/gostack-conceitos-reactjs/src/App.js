import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `test ${Date.now()}`,
      url: "https:teste.com",
      techs: "test and test"
    });
    //console.log(response.data)

    const newRepo = response.data;

    setRepositories([...repositories, newRepo]);
  };

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
    const response = await api.get('repositories');
    setRepositories(repositories.filter(repo => repo.id != id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
              </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
