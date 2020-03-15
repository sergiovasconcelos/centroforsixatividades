
const express = require("express");
const banco = require('./banco.json');

const server = express();

server.use(express.json());//Middleware

const { projetos } = banco;

const projects = [
  {
    id: "1",
    title: "Novo projeto",
    tasks: ["Fazer Orçamento", "Rever o Inventário", "etc."]
  }
];

function checkproject(req, res, next){
  const { id } = req.params;
  const retorno = projetos.find(projeto => projeto.id == id);
  if(!retorno){
    return res.status(400).json({error: "Id não localizado."});
  }
  return res.status(200).json(retorno);
  next();
}

server.get("/projetos/", (req, res)=> {
    const { id } = req.params;
    return res.status(200).json(projetos);
});

server.get("/projetos/:id", (req, res)=> {
  const { id } = req.params;
  const localizado = projetos.find(proj => proj.id == id);//Nesse caso, se não localizar, retorna o que tá no if
  //const localizado = projetos.filter(proj => proj.id == id);//Nesse caso, não retorna o que está no if
  if(!localizado){
    return res.status(400).json({error: "Id não localizado!"});
  }
  return res.status(200).json(localizado);  
});

server.post("/projetos", (req, res) => {
    const { id, titulo, tarefas } = req.body;//ou
    //const projeto = req.body;

    projetos.push({ id, titulo, tarefas });

    return res.status(200).json({ projetos });
});

server.put('/projetos/:id', checkproject, (req, res) => {
    const { id } = req.params;
    const { tittle } = req.body;

    const projectId = projectId.findIndex(projeto => projects.id == id);
    projects[projectId].tittle = tittle;

    return res.status(200).json(projects[projectId]);
  })
  
  server.delete('/projetos/:id',  checkproject,(req, res) => {
    const { id } = req.params;
    const retorno = projetos.findIndex(projeto => projeto.id == id);
    projects.splice(projectId, 1);
    return res.status(200).json(retorno[projects]);
  })

  server.post('/projetos/:id/tarefas', (req, res) => {
    const { id } = req.params;
    const { atividades } = req.body;
    const retorno = projetos.find((projeto) => projeto.id == id);
    if(!retorno){
      return res.status(400).json({error: "Não localizado"});
    }
    atividades.forEach(atividade => {
      localizado.atividades.push(atividade);
    })
    return res.status(200).json(projetos);
  })

server.listen(3333);