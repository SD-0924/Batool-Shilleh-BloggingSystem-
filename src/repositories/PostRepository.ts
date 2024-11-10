import { Post } from '../models/Post';

class PostRepository {
    async createPost(data: any) {
        return await Post.create(data);
    }

    async findAllPosts() {
        return await Post.findAll();
    }

    async findPostById(id: number) {
        return await Post.findByPk(id);
    }

    async updatePost(id: number, data: any) {
        return await Post.update(data, { where: { id } });
    }

    async deletePost(id: number) {
        return await Post.destroy({ where: { id } });
    }
}

export default new PostRepository();
