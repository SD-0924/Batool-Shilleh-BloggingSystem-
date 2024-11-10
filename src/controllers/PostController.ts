import { Request, Response } from 'express';
import postService from '../services/PostService';

class PostController {
    async createPost(req: Request, res: Response) {
        try {
            const newPost = await postService.createPost({
                ...req.body,
                userId: req.user.id,
            });
            res.status(201).json(newPost);
        } catch (error) {
            res.status(500).json({ message: 'Error creating post', error });
        }
    }

    async getAllPosts(req: Request, res: Response) {
        try {
            const posts = await postService.findAllPosts();
            res.json(posts);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching posts', error });
        }
    }

    async getPostById(req: Request, res: Response) {
        try {
            const post = await postService.findPostById(Number(req.params.id));
            if (!post) {
                res.status(404).json({ message: 'Post not found' });
            } else {
                res.json(post);
            }
        } catch (error) {
            res.status(500).json({ message: 'Error fetching post', error });
        }
    }

    async updatePost(req: Request, res: Response) {
        try {
            const updatedPost = await postService.updatePost(Number(req.params.id), req.body);
            res.json(updatedPost);
        } catch (error) {
            res.status(500).json({ message: 'Error updating post', error });
        }
    }

    async deletePost(req: Request, res: Response) {
        try {
            await postService.deletePost(Number(req.params.id));
            res.json({ message: 'Post deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting post', error });
        }
    }
}

export default new PostController();
