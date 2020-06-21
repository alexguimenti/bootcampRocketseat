const express = require("express");
const cors = require("cors");
const { uuid } = require('uuidv4');

const app = express();

app.use(express.json());
app.use(cors());
app.use(logRequest);

const repositories = [
  // {
  //   id: "7dbca838-b7e0-4fda-97ae-92e6606e9819",
  //   title: 'Ecoleta',
  //   url: 'https://github.com/alexguimenti/appEcoleta',
  //   techs: 'Node, ReactJS, React Native',
  //   likes: 7
  // },
  // {
  //   id: "1ef64898-bc97-4ff3-a29c-f9428d09526b",
  //   title: 'CS50 Harvard',
  //   url: 'https://github.com/alexguimenti/CS50HarvardUniversity',
  //   techs: 'C and Python',
  //   likes: 3
  // }
];

function logRequest(request, response, next) {
  const { method, url } = request;
  const logLabel = `🎯 [${method}] ${url}`
  
  console.time(logLabel);
  next();
  console.timeEnd(logLabel);
}

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repository);

  return response.json(repository)
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoryId = repositories.findIndex(repo => repo.id == id);

  if (repositoryId < 0) {
    return response.status(400).json("Id not found!");
  }

  if (title) {
    repositories[repositoryId].title = title
  }

  if (url) {
    repositories[repositoryId].url = url
  }

  if (techs) {
    repositories[repositoryId].techs = techs
  }

  return response.json(repositories[repositoryId]);

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryId = repositories.findIndex(repo => repo.id == id);

  if (repositoryId < 0) {
    return response.status(400).json("Id not found!");
  }

  repositories.splice(repositoryId, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoryId = repositories.findIndex(repo => repo.id == id);

  if (repositoryId < 0) {
    return response.status(400).json("Id not found!");
  }

  repositories[repositoryId].likes++;

  return response.json(repositories[repositoryId]);

});

module.exports = app;
