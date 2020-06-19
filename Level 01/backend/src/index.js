const express = require('express');
const cors = require('cors');
const { uuid, isUuid } = require('uuidv4');

const app = express();

app.use(cors())
app.use(express.json());

const projects = [
  {
    id: "59ab89ae-5702-4543-a9e7-1e159499c2f2",
    title: "Front-end com ReactJS",
    owner: "Alexandre Guimenti"
  },
  {
    id: "271a4556-9a15-49c1-add8-e2082488d205",
    title: "Mobile com React Native",
    owner: "Alexandre Guimenti"
  }
];

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
  console.log('🚀 Back-end started at port 3333!')
});