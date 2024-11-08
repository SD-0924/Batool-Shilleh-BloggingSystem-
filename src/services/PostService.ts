import PostRepository from '../repositories/PostRepository'

class PostService {
  async getAllPosts() {
    return await PostRepository.getAllPosts()
  }

  async getPostById(postId: number) {
    return await PostRepository.getPostById(postId)
  }

  async createPost(postData: any) {
    return await PostRepository.createPost(postData)
  }

  async updatePost(postId: number, postData: any) {
    return await PostRepository.updatePost(postId, postData)
  }

  async deletePost(postId: number) {
    const post = await PostRepository.getPostById(postId)
    if (post) {
      await PostRepository.deletePost(postId)
      return true
    }
    return false
  }
}

export default new PostService()
