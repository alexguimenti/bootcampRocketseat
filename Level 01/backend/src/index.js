const express = require('express');
const { uuid, isUuid } = require('uuidv4');

const app = express();
app.use(express.json());

const projects = [];

function logRequest(request, response, next) {
  const { method, url } = request

  const logLabel = `🎯 [${method.toUpperCase()}] ${url}`

  console.time(logLabel);
  next();
  console.timeEnd(logLabel);
}

function validateProjectId(request, response, next) {
  const { id } = request.params;
  if(!isUuid(id)) {
    return response.status(400).json({error: 'Invalid project Id.' })
  }

  return next();
}

app.use(logRequest)

app.get('/projects', (request, response) => {
  const { owner } = request.query;

  const result = owner
    ? projects.filter(project => project.owner.includes(owner))
    : projects

  return response.json(result);

})

app.post('/projects', (request, response) => {
  const { title, owner } = request.body;
  const project = { id: uuid(), title, owner }

  projects.push(project)

  return response.json(project)
})

app.put('/projects/:id', (request, response) => {
  const { id } = request.params;

  const projectIndex = projects.findIndex(project => project.id == id);

  if (projectIndex < 0) {
    return response.status(400).json('Project not found!')
  }

  const body = request.body;
  if (body.title) {
    const { title } = request.body;
    projects[projectIndex].title = title;
  }

  if (body.owner) {
    const { owner } = request.body;
    projects[projectIndex].owner = owner;
  }

  return response.json(projects[projectIndex]);
})

app.delete('/projects/:id', (request, response) => {
  const { id } = request.params;

  const projectIndex = projects.findIndex(project => project.id == id);

  if (projectIndex < 0) {
    return response.status(400).json('Project not found!')
  }

  projects.splice(projectIndex, 1);

  return response.status(204).send();
})

app.listen(3333, () => {
  console.log('🚀 Back-end started!')
});