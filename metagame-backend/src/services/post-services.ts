import { Post } from "@prisma/client";
import { notFoundError } from "errors/not-found-error";
import postRepository from "repositories/post-repository";

async function createPost(userId: number, postContent: string, postDatetime: Date) {
  return postRepository.createPost(userId, postContent, postDatetime);
}

async function getPostById(id: number): Promise<Post> {
    const post = await postRepository.findById(id);

    if (!post) {
      throw notFoundError();
    }

    return post;
  }

  async function updatePost(id: number, updatedPost: Partial<Post>): Promise<Post> {
    const post = await postRepository.findById(id);
  
    if (!post) {
      throw notFoundError();
    }
  
    const updated = await postRepository.update(id, updatedPost.post_content, updatedPost.post_datetime);
  
    return updated;
  }
  

async function deletePost(id: number): Promise<void> {
    const post = await postRepository.findById(id);

    if (!post) {
      throw notFoundError();
    }

    await postRepository.deletePost(id);
  }

async function getPostsByUserId(userId: number): Promise<Post[]> {
    const posts = await postRepository.findByUserId(userId);
    return posts;
}

const postService = {
    createPost,
    getPostById,
    updatePost,
    deletePost,
    getPostsByUserId
}

export default postService;