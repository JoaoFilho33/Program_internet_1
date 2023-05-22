"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const main_1 = __importDefault(require("./main"));
const app = (0, express_1.default)();
const microblog = new main_1.default();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.post('/posts', (req, res) => {
    const post = req.body; // Json vindo do cliente   
    microblog.create(post);
    res.json({ message: 'Post criado!' });
});
app.get('/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = microblog.retrieve(id);
    if (post) {
        res.json(post);
    }
    else {
        res.status(404).json({ message: 'Post não encontrado!' });
    }
});
app.get('/posts', (req, res) => {
    const posts = microblog.retrieveAll();
    if (posts) {
        res.json(posts);
    }
    else {
        res.json([]);
    }
});
app.put('/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = req.body;
    post.id = id;
    microblog.update(post);
    res.json({ message: 'Post atualizado!' });
});
app.delete('/posts/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        microblog.delete(id);
        res.sendStatus(204);
    }
    catch (error) {
        res.status(404).json({ error: 'Post não encontrado!' });
    }
});
app.patch('/posts/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const post = microblog.retrieve(id);
        if (post) {
            microblog.update(Object.assign(Object.assign({}, post), req.body));
            res.sendStatus(200);
        }
        else {
            res.status(404).json({ error: 'Post não encontrado!' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor!' });
    }
});
app.patch('/posts/:id/likes', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const post = microblog.retrieve(id);
        if (post) {
            post.likes++;
            res.sendStatus(200);
        }
        else {
            res.status(404).json({ error: 'Post não encontrado!' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Erro interno do servidor!' });
    }
});
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
//# sourceMappingURL=server.js.map