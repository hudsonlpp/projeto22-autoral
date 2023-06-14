import { PrismaClient, Like } from '@prisma/client';

const prisma = new PrismaClient();

async function createPostLike(postId: number, userId: number): Promise<Like> {
    console.log('Creating like:', postId, userId);
  
      const like = await prisma.like.create({
        data: {
          user_id: userId,
          post_id: postId,
        },
      })
        return like;
}
  
async function deletePostLike(likeId: number): Promise<void> { 
      await prisma.like.delete({
        where: {
          id: likeId,
        },
      });
}
  

export async function getPostLikes(postId: number): Promise<Like[]> {
console.log('Getting likes for post:', postId);
  const likes = await prisma.like.findMany({
    where: {
      post_id: postId,
    },
    include: {
      user: true,
    },
  });
console.log('Likes:', likes);

  return likes;
}


const likeRepository = {
    createPostLike,
    deletePostLike,
    getPostLikes
}

export default likeRepository