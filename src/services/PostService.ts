import postRepository from '../repositories/PostRepository';

class PostService {
    async createPost(data: any) {
        return await postRepository.createPost(data);
    }

    async findAllPosts() {
        return await postRepository.findAllPosts();
    }

    async findPostById(id: number) {
        return await postRepository.findPostById(id);
    }

    async updatePost(id: number, data: any) {
        return await postRepository.updatePost(id, data);
    }

    async deletePost(id: number) {
        return await postRepository.deletePost(id);
    }
}

export default new PostService();
