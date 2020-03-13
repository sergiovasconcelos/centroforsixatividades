
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
    const projetoEncontrado = projetos.find((projeto) => projeto.id == id);
    if(!projetoEncontrado){
      return res.status(400).json({error: "Id de projeto não contém na lista de projetos"});
    }
    projetoEncontrado.titulo = titulo;
    return res.status(200).json(projetoEncontrado);
  })
  
  server.delete('/projetos/:id', (req, res) => {
    const { id } = req.params;
    const projetoEncontrado = projetos.find((projeto) => projeto.id == id);
    if(!projetoEncontrado){
      return res.status(400).json({error: "Id de projeto não contém na lista de projetos"});
    }
    projetos.splice(projetos.indexOf(projetoEncontrado), 1);
    return res.status(200).json(projetos);
  })

server.listen(3333);