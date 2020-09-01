const express = require("express");
const cors = require("cors");

const { v4: uuid } = require("uuid");
const { json } = require("express");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

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
    likes: 0,
  };

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;
  const index = repositories.findIndex((x) => x.id === id);

  if (index === -1) return response.status(400).send();

  let repository = repositories[index];
  repository = { ...repository, title, url, techs };

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const index = repositories.findIndex((x) => x.id === id);

  if (index === -1) return response.status(400).send();

  repositories.splice(index, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const index = repositories.findIndex((x) => x.id === id);

  if (index === -1) return response.status(400).send();

  let repository = repositories[index];
  repository.likes++;

  return response.json(repository);
});

module.exports = app;
