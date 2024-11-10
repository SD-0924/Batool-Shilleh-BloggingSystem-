import { Request, Response } from 'express';
import commentService from '../services/CommentService';

class CommentController {
    async createComment(req: Request, res: Response) {
        try {
            const userId = req.user.id; 

            if (!userId) {
                 res.status(400).json({ message: 'User not authenticated' });
            }

            const newComment = await commentService.createComment({
                content: req.body.content,
                postId: req.body.postId,
                userId, 
            });

            res.status(201).json(newComment);
        } catch (error) {
            res.status(500).json({ message: 'Error creating comment', error });
        }
    }

    async getAllCommentsByPost(req: Request, res: Response) {
        try {
            const comments = await commentService.findAllCommentsByPost(Number(req.params.postId));
            res.json(comments);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching comments', error });
        }
    }

    async updateComment(req: Request, res: Response) {
        try {
            const updatedComment = await commentService.updateComment(Number(req.params.id), req.body);
            res.json(updatedComment);
        } catch (error) {
            res.status(500).json({ message: 'Error updating comment', error });
        }
    }

    async deleteComment(req: Request, res: Response) {
        try {
            await commentService.deleteComment(Number(req.params.id));
            res.json({ message: 'Comment deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting comment', error });
        }
    }
}

export default new CommentController();
