"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var prisma = require('./prisma');
var Microblog = /** @class */ (function () {
    function Microblog() {
        this.posts = [];
    }
    Microblog.prototype.create = function (post) {
        this.posts.push(post);
    };
    Microblog.prototype.retrieve = function (id) {
        return this.posts.find(function (post) { return post.id === id; });
    };
    Microblog.prototype.update = function (post) {
        var i = this.posts.findIndex(function (p) { return p.id === post.id; });
        if (i !== -1) {
            this.posts[i] = post;
        }
    };
    Microblog.prototype.delete = function (id) {
        var i = this.posts.findIndex(function (p) { return p.id === id; });
        if (i !== -1) {
            this.posts.splice(i, 1);
        }
    };
    Microblog.prototype.retrieveAll = function () {
        return this.posts;
    };
    return Microblog;
}());
exports.default = Microblog;
var MicroblogPersist = /** @class */ (function (_super) {
    __extends(MicroblogPersist, _super);
    function MicroblogPersist() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MicroblogPersist;
}(Microblog));
module.exports = Microblog;
