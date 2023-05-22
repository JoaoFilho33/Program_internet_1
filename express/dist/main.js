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
exports.Microblog = void 0;
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite_1 = require("sqlite");
class Microblog {
    constructor() {
        this.posts = [];
    }
    create(post) {
        this.posts.push(post);
    }
    retrieve(id) {
        return this.posts.find((post) => post.id === id);
    }
    update(post) {
        const i = this.posts.findIndex((p) => p.id === post.id);
        if (i !== -1) {
            this.posts[i] = post;
        }
    }
    delete(id) {
        const i = this.posts.findIndex((p) => p.id === id);
        if (i !== -1) {
            this.posts.splice(i, 1);
        }
    }
    retrieveAll() {
        return this.posts;
    }
}
exports.Microblog = Microblog;
//estou usando apenas essa classe no server
class MicroblogPersist {
    constructor() {
        this.dB = null;
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            this.dB = yield (0, sqlite_1.open)({
                filename: "./database.db",
                driver: sqlite3_1.default.Database,
            });
            yield this.dB.exec(`
          CREATE TABLE IF NOT EXISTS post (
            id INTEGER PRIMARY KEY,
            text TEXT,
            likes INTEGER
          )
        `);
        });
    }
    create(post) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.dB.run("INSERT INTO post (id, text, likes) VALUES (?, ?, ?)", post.id, post.text, post.likes);
        });
    }
    retrieve(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.dB.get("SELECT * FROM post WHERE id = ?", id);
            if (result) {
                return {
                    id: result.id,
                    text: result.text,
                    likes: result.likes,
                };
            }
            return undefined;
        });
    }
    update(post) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.dB.run("UPDATE post SET text = ?, likes = ? WHERE id = ?", post.text, post.likes, post.id);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.dB.run("DELETE FROM post WHERE id = ?", id);
        });
    }
    retrieveAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.dB.all("SELECT * FROM post");
            return results.map((result) => ({
                id: result.id,
                text: result.text,
                likes: result.likes,
            }));
        });
    }
}
exports.default = MicroblogPersist;
module.exports = MicroblogPersist;
//# sourceMappingURL=main.js.map