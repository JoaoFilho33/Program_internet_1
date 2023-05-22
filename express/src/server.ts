import express, { Request, Response } from 'express';
import MicroblogPersist, { Post } from './main';

const app = express();
const microblogPersist = new MicroblogPersist();

microblogPersist.initialize();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/posts', (req: Request, res: Response) => {
  const post: Post = req.body;
  microblogPersist.create(post);
  res.json({ message: 'Post criado!' });
});

app.get('/posts/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const post = await microblogPersist.retrieve(id);
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ message: 'Post não encontrado!' });
  }
});

app.get('/posts', async (req: Request, res: Response) => {
  const posts = await microblogPersist.retrieveAll();
  res.json(posts);
});

app.put('/posts/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const post: Post = req.body;
  post.id = id;
  microblogPersist.update(post);
  res.json({ message: 'Post atualizado!' });
});

app.delete('/posts/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  microblogPersist.delete(id);
  res.sendStatus(204);
});

app.patch('/posts/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { text, likes } = req.body;

  const post = await microblogPersist.retrieve(id);
  if (!post) {
    return res.status(404).json({ message: 'Post não encontrado!' });
  }

  const updatedPost: Post = {
    id: post.id,
    text: text || post.text,
    likes: likes !== undefined ? likes : post.likes
  };

  microblogPersist.update(updatedPost);
  res.sendStatus(200);
});

app.patch('/posts/:id/like', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  const post = await microblogPersist.retrieve(id);
  if (!post) {
    return res.status(404).json({ message: 'Post não encontrado!' });
  }

  const updatedPost: Post = {
    id: post.id,
    text: post.text,
    likes: post.likes + 1
  };

  microblogPersist.update(updatedPost);
  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});