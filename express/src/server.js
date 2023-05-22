"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var main_1 = __importDefault(require("./main"));
var app = (0, express_1.default)();
var microblog = new main_1.default();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.post('/posts', function (req, res) {
    var post = req.body; // Json vindo do cliente   
    microblog.create(post);
    res.json({ message: 'Post criado!' });
});
app.get('/posts/:id', function (req, res) {
    var id = parseInt(req.params.id);
    var post = microblog.retrieve(id);
    if (post) {
        res.json(post);
    }
    else {
        res.status(404).json({ message: 'Post não encontrado!' });
    }
});
app.get('/posts', function (req, res) {
    var posts = microblog.retrieveAll();
    if (posts) {
        res.json(posts);
    }
    else {
        res.json([]);
    }
});
app.put('/posts/:id', function (req, res) {
    var id = parseInt(req.params.id);
    var post = req.body;
    post.id = id;
    microblog.update(post);
    res.json({ message: 'Post atualizado!' });
});
app.delete('/posts/:id', function (req, res) {
    try {
        var id = parseInt(req.params.id);
        microblog.delete(id);
        res.sendStatus(204);
    }
    catch (error) {
        res.status(404).json({ error: 'Post não encontrado!' });
    }
});
app.patch('/posts/:id', function (req, res) {
    try {
        var id = parseInt(req.params.id);
        var post = microblog.retrieve(id);
        if (post) {
            microblog.update(__assign(__assign({}, post), req.body));
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
app.patch('/posts/:id/likes', function (req, res) {
    try {
        var id = parseInt(req.params.id);
        var post = microblog.retrieve(id);
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
app.listen(3000, function () {
    console.log('Servidor rodando na porta 3000');
});
