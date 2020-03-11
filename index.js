
const express = require("express");
const banco = require('banco.json');

const server = express();
server.use(express.json());
const { projetos } = banco;

server.use((req, res, next) => {
    next();
  })

server.get("/projetos/", (req, res)=> {
    const { id } = req.params;
    return res.status(200).json(id);
});

server.post("/projetos", (req, res) => {
    const { id, titulo, tarefas } = req.body;//

    projetos.push({ id, titulo, tarefas });

    return res.status(200).json({ projetos });
});

server.listen(3333);