import express, { Request, Response } from 'express';
import Microblog from './main';

const app = express();
const microblog = new Microblog();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/posts', (req: Request, res: Response) => {
  const post = req.body; // Json vindo do cliente   
  microblog.create(post);
  res.json({ message: 'Post criado!' });
});

app.get('/posts/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const post = microblog.retrieve(id);
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ message: 'Post não encontrado!' });
  }
});

app.get('/posts', (req: Request, res: Response) => {
  const posts = microblog.retrieveAll();
  if (posts) {
    res.json(posts);
  } else {
    res.json([]);
  }
});

app.put('/posts/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const post = req.body;
  post.id = id;
  microblog.update(post);
  res.json({ message: 'Post atualizado!' });
});

app.delete('/posts/:id', (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    microblog.delete(id);
    res.sendStatus(204);
  } catch (error) {
    res.status(404).json({ error: 'Post não encontrado!' });
  }
});

app.patch('/posts/:id', (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const post = microblog.retrieve(id);
    if (post) {
      microblog.update({ ...post, ...req.body });
      res.sendStatus(200);
    } else {
      res.status(404).json({ error: 'Post não encontrado!' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor!' });
  }
});

app.patch('/posts/:id/likes', (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const post = microblog.retrieve(id);
    if (post) {
      post.likes++;
      res.sendStatus(200);
    } else {
      res.status(404).json({ error: 'Post não encontrado!' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor!' });
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
