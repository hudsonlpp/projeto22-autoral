import { Like } from '@prisma/client';
import likeRepository from 'repositories/like-repository';

async function addLikeToPost(postId: number, userId: number): Promise<Like> {
  console.log('Adding like to post:', postId);
  console.log('User ID:', userId);

  const like = await likeRepository.createPostLike(postId, userId);
  
  console.log('Like added:', like);
  return like;
}

async function removeLikeFromPost(likeId: number): Promise<void> {
  await likeRepository.deletePostLike(likeId);
}

async function getPostLikes(postId: number): Promise<Like[]> {
  const likes = await likeRepository.getPostLikes(postId);
  return likes;
}


const likeServices = {
    addLikeToPost,
    removeLikeFromPost,
    getPostLikes
}

export default likeServices;