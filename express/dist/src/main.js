"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
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
exports.default = Microblog;
// class MicroblogPersist extends Microblog {
// }
module.exports = Microblog;
//# sourceMappingURL=main.js.map