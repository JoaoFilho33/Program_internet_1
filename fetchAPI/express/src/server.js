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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var main_1 = require("./main");
var cors_1 = require("cors");
var app = (0, express_1.default)();
var microblogPersist = new main_1.default();
microblogPersist.initialize();
app.use((0, cors_1.default)({
    origin: '*'
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.post('/posts', function (req, res) {
    var post = req.body;
    var createdPost = microblogPersist.create(post);
    res.json(createdPost);
});
app.get('/posts/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, post;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = parseInt(req.params.id);
                return [4 /*yield*/, microblogPersist.retrieve(id)];
            case 1:
                post = _a.sent();
                if (post) {
                    res.json(post);
                }
                else {
                    res.status(404).json({ message: 'Post não encontrado!' });
                }
                return [2 /*return*/];
        }
    });
}); });
app.get('/posts', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var posts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, microblogPersist.retrieveAll()];
            case 1:
                posts = _a.sent();
                res.json(posts);
                return [2 /*return*/];
        }
    });
}); });
app.put('/posts/:id', function (req, res) {
    var id = parseInt(req.params.id);
    var post = req.body;
    post.id = id;
    microblogPersist.update(post);
    res.json({ message: 'Post atualizado!' });
});
app.delete('/posts/:id', function (req, res) {
    var id = parseInt(req.params.id);
    microblogPersist.delete(id);
    res.sendStatus(204);
});
app.patch('/posts/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, text, likes, post, updatedPost;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = parseInt(req.params.id);
                _a = req.body, text = _a.text, likes = _a.likes;
                return [4 /*yield*/, microblogPersist.retrieve(id)];
            case 1:
                post = _b.sent();
                if (!post) {
                    return [2 /*return*/, res.status(404).json({ message: 'Post não encontrado!' })];
                }
                updatedPost = {
                    id: post.id,
                    text: text || post.text,
                    likes: likes !== undefined ? likes : post.likes,
                    title: post.title,
                    date: post.date
                };
                microblogPersist.update(updatedPost);
                res.sendStatus(200);
                return [2 /*return*/];
        }
    });
}); });
app.patch('/posts/:id/like', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, post, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                id = parseInt(req.params.id);
                return [4 /*yield*/, microblogPersist.retrieve(id)];
            case 1:
                post = _a.sent();
                post.likes++;
                return [4 /*yield*/, microblogPersist.update(post)];
            case 2:
                _a.sent();
                return [2 /*return*/, res.status(200).json({
                        likes: post.likes
                    })];
            case 3:
                error_1 = _a.sent();
                console.error("erro");
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.listen(3000, function () {
    console.log('Servidor rodando na porta 3000');
});
