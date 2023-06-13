import { Post, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createPost(userId: number, postContent: string, postDatetime: Date) {
    console.log(userId,postContent, postDatetime)
    return prisma.post.create({
      data:{
        user_id:userId,
        post_content: postContent,
        post_datetime: postDatetime,
      }, include: {
            user: true,
          },
    })
}

async function findById(postId: number): Promise<Post | null> {

  const post = await prisma.post.findUnique({
    where: { id: parseInt(postId.toString(), 10) },
  });

  if (!post) {
    // Lidar com o caso em que o post não foi encontrado
    return null;
  }

  console.log("ID -> ", postId);
  console.log(post);
  return post;
}






// async function update(post: Post): Promise<Post> {
//   const { id, post_content: newText, post_datetime: newDatetime } = post;
//   const updatedPost = await prisma.post.update({
//     where: { id: id },
//     data: { post_content: newText, post_datetime: newDatetime }
//   });

//   return updatedPost;
// }

async function update(id: number, postContent: string, postDatetime: Date): Promise<Post | null> {
  try {
    const postId = parseInt(id.toString());
    console.log(postId, id)
    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: { post_content: postContent, post_datetime: postDatetime },
      include: { user: true },
    });

    return updatedPost;
  } catch (error) {
    console.error(error);
    return null;
  }
}


async function deletePost(id: number): Promise<void> {
  await prisma.post.delete({
    where: { id },
  });
}

async function findByUserId(userId: number): Promise<Post[]> {
  const posts = await prisma.post.findMany({
    where: { user_id: userId },
  });

  return posts;
}

const postRepository = {
    createPost,
    findById,
    update,
    deletePost,
    findByUserId
}

export default postRepository;
