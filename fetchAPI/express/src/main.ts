import sqlite3 from "sqlite3";
import {open, Database} from "sqlite";

export interface Post {
    id: number
    text: string
    likes: number
    title: string
    date: Date
}

export class Microblog {
    public posts: Post[]

    constructor() {
        this.posts = []
    }

    create(post: Post): void{
        this.posts.push(post)
    }

    retrieve(id: number): Post | undefined{
        return this.posts.find((post) => post.id === id) 
    }

    update(post: Post): void {
        const i = this.posts.findIndex((p) => p.id === post.id)
        if(i !== -1) {
            this.posts[i] = post
        }
    }

    delete(id: number): void {
        const i = this.posts.findIndex((p) => p.id === id)
        if(i !== -1) {
            this.posts.splice(i, 1)
        }
    }

    retrieveAll(): Post[] {
        return this.posts
    }
}

//estou usando apenas essa classe no server
export default class MicroblogPersist {
    public dB: Database;

    constructor() {
        this.dB = null
    }

    async initialize(): Promise<void> {
        this.dB = await open({
          filename: "./database.db",
          driver: sqlite3.Database,
        });
    
        await this.dB.exec(`
          CREATE TABLE IF NOT EXISTS post (
            id INTEGER PRIMARY KEY,
            text TEXT,
            likes INTEGER,
            title TEXT,
            date TIMESTAMP            
          )
        `);
      }
    
      async create(post: Post): Promise<void> {
        await this.dB.run(
          "INSERT INTO post (id, text, likes, title, date) VALUES (?, ?, ?, ?, ?)",
          post.id,
          post.text,
          post.likes,
          post.title,
          post.date
        );
      }
    
      async retrieve(id: number): Promise<Post | undefined> {
        const result = await this.dB.get(
          "SELECT * FROM post WHERE id = ?",
          id
        );
    
        if (result) {
          return {
            id: result.id,
            text: result.text,
            likes: result.likes,
            title: result.title,
            date: result.date
          };
        }
        return undefined;
      }
    
      async update(post: Post): Promise<void> {
        await this.dB.run(
          "UPDATE post SET text = ?, likes = ?, title = ?  WHERE id = ?",
            post.text,
            post.likes,
            post.title,
            post.id
        );
      }
    
      async delete(id: number): Promise<void> {
        await this.dB.run("DELETE FROM post WHERE id = ?", id);
      }
    
      async retrieveAll(): Promise<Post[]> {
        const results = await this.dB.all("SELECT * FROM post");
        return results.map((result) => ({
          id: result.id,
          text: result.text,
          likes: result.likes,
          title: result.title,
            date: result.date
        }));
      }
}

module.exports = MicroblogPersist
