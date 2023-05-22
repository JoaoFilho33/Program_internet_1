interface Post {
    id: number
    text: string
    likes: number
}

export default class Microblog {
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

class MicroblogPersist extends Microblog {
    
}

module.exports = Microblog
