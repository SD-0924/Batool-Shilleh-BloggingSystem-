import { Post } from '../models/Post'
import {User} from '../models/User'

class PostRepository {
  async getAllPosts() {
    return await Post.findAll({ include: [{ model: User }] })
  }

  async getPostById(postId: number) {
    return await Post.findByPk(postId, { include: [{ model: User }] })
  }

  async createPost(postData: any) {
    return await Post.create(postData)
  }

  async updatePost(postId: number, postData: any) {
    const post = await Post.findByPk(postId)
    if (post) {
      return await post.update(postData)
    }
    return null
  }

  async deletePost(postId: number) {
    const post = await Post.findByPk(postId)
    if (post) {
      return await post.destroy()
    }
    return null
  }
}

export default new PostRepository()
