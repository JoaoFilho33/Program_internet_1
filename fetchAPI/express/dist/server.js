"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const main_1 = __importDefault(require("./main"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const microblogPersist = new main_1.default();
microblogPersist.initialize();
app.use((0, cors_1.default)({
    origin: '*'
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.post('/posts', (req, res) => {
    const post = req.body;
    const createdPost = microblogPersist.create(post);
    res.json(createdPost);
});
app.get('/posts/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const post = yield microblogPersist.retrieve(id);
    if (post) {
        res.json(post);
    }
    else {
        res.status(404).json({ message: 'Post não encontrado!' });
    }
}));
app.get('/posts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield microblogPersist.retrieveAll();
    res.json(posts);
}));
app.put('/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = req.body;
    post.id = id;
    microblogPersist.update(post);
    res.json({ message: 'Post atualizado!' });
});
app.delete('/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    microblogPersist.delete(id);
    res.sendStatus(204);
});
app.patch('/posts/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { text, likes } = req.body;
    const post = yield microblogPersist.retrieve(id);
    if (!post) {
        return res.status(404).json({ message: 'Post não encontrado!' });
    }
    const updatedPost = {
        id: post.id,
        text: text || post.text,
        likes: likes !== undefined ? likes : post.likes,
        title: post.title,
        date: post.date
    };
    microblogPersist.update(updatedPost);
    res.sendStatus(200);
}));
app.patch('/posts/:id/like', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const post = yield microblogPersist.retrieve(id);
        post.likes++;
        yield microblogPersist.update(post);
        return res.status(200).json({
            likes: post.likes
        });
    }
    catch (error) {
        console.error("erro");
    }
}));
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
//# sourceMappingURL=server.js.map