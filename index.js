
const express = require("express");
const banco = require('./banco.json');

const server = express();
server.use(express.json());
const { projetos } = banco;

server.use((req, res, next) => {
    next();
  })

server.get("/projetos/", (req, res)=> {
    const { id } = req.params;
    return res.status(200).json(projetos);
});

server.post("/projetos", (req, res) => {
    const { id, titulo, tarefas } = req.body;//

    projetos.push({ id, titulo, tarefas });

    return res.status(200).json({ projetos });
});

server.put('/projetos/:id', (req, res) => {
    const { id } = req.params;
    const { titulo } = req.body;
    const retorno = projetos.find((projeto) => projeto.id == id);
    if(!retorno){
      return res.status(400).json({error: "Id não localizado."});
    }
    retorno.titulo = titulo;
    return res.status(200).json(retorno);
  })
  
  server.delete('/projetos/:id', (req, res) => {
    const { id } = req.params;
    const retorno = projetos.find((projeto) => projeto.id == id);
    if(!retorno){
      return res.status(400).json({error: "Não localizado"});
    }
    projetos.splice(projetos.indexOf(retorno), 1);
    return res.status(200).json(projetos);
  })

server.listen(3333);