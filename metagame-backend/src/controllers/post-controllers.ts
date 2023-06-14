import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import postService from 'services/post-services';
import { Post } from '@prisma/client';
import { AuthenticatedRequest } from 'protocols';

async function createPost(req: AuthenticatedRequest , res: Response, next: NextFunction) {
  const { postContent, postDatetime } = req.body;
  const { userId } = req

  try {
    console.log(req.body)
    const post = await postService.createPost(userId, postContent, postDatetime);
    return res.status(httpStatus.CREATED).json(post);
  } catch (error) {
    console.log(error)
    next(error);
  }
}

async function getPostById(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!Number.isNaN(Number(id))) {
      const post: Post | null = await postService.getPostById(parseInt(id, 10));

      if (!post) {
        return res.status(httpStatus.NOT_FOUND).json({ error: 'Post not found' });
      }

      return res.json(post);
    } else {
      return res.status(httpStatus.BAD_REQUEST).json({ error: 'Invalid post ID' });
    }
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
}


async function updatePost(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { post_content, post_datetime }: Partial<Post> = req.body;

    const updatedPost: Post = await postService.updatePost(parseInt(id, 10), {
      post_content,
      post_datetime,
    });

    res.json(updatedPost);
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).json({ error: error.message });
  }
}


async function deletePost(req: Request, res: Response) {
  try {
    const { id } = req.params;

    await postService.deletePost(parseInt(id));

    res.sendStatus(httpStatus.NO_CONTENT);
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({ error: error.message });
  }
}

async function getPostsByUserId(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const posts: Post[] = await postService.getPostsByUserId(parseInt(userId));

    res.json(posts);
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).json({ error: error.message });
  }
}
// async function getPostsById(req, res) {
//   const page = req.query.page ? parseInt(req.query.page) : 1;
//   const { id } = req.params;
//   const posts = await postService.getPostsById(id, page);
//   res.send(posts.rows);
// }

// async function repost(req, res) {
//   const { postId } = req.params
//   const { userId } = res.locals;
//   await postService.repost({ postId, userId })
//   res.sendStatus(201);
//   // alterar para res.sendStatus(201);
// }

// async function getPosts(req, res) {
//   const page = req.query.page ? parseInt(req.query.page) : 1;
//   const { userId } = res.locals;
//   const posts = await postService.getPosts(page, userId);
//   res.send(posts.rows);
// }



// async function like(req, res) {
//   const { postId } = req.params;
//   const { userId } = res.locals;
//   const response = await postService.like({ postId, userId });
//   res.send(response);
// }

// async function updatePost(req, res) {
//   const { postId } = req.params;
//   const { content } = req.body;
//   const { userId } = res.locals;
//   await postService.updatePost({ postId, content, userId });
//   res.sendStatus(200);
// }

// async function deletePost(req, res) {
//   const { postId } = req.params;
//   const { userId } = res.locals;
//   await postService.deletePost({ postId, userId });
//   res.sendStatus(200);
// }

// const postController = { publishPost, repost, getPosts, getPostsById, like, updatePost, deletePost };
// export default postController;

const postController = {
    createPost,
    getPostById,
    updatePost,
    deletePost,
    getPostsByUserId
}

export default postController;

