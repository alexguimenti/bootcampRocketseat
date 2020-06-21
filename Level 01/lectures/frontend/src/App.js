import React, { useState, useEffect } from 'react';
import api from './services/api';

import Header from './components/Header';

function App() {
  const [ projects, setProjects ] = useState([])

  useEffect(() => {
    api.get('/projects').then(response => {
      setProjects(response.data)
    })
  }, [])

  async function handleAddProject(){
    //setProjects([...projects, `New Project ${Date.now()}`])
    const response = await api.post('projects', {
      title: `New Project ${Date.now()}`,
      owner: "owner"
    });

    const project = response.data;

    setProjects([...projects, project])
  }

  return (
    <>
      <Header />
      <ul>
        {projects.map((project) => <li key={project.id}>{project.title}</li>)}
      </ul>
      <button onClick={handleAddProject}>Add</button>
    </>
  )
}

export default App;