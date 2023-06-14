import { Request, Response, NextFunction } from 'express';
import likeServices from '../services/like-services';
import httpStatus from 'http-status';

async function addLike(req: Request, res: Response, next: NextFunction) {
  try {
    const postId = parseInt(req.params.id);
    const userId = parseInt(req.body.userId);
    const like = await likeServices.addLikeToPost(postId, userId);
    console.log(like,postId,userId)
    return res.status(httpStatus.CREATED).json(like);
  } catch (error) {
    next(error);
  }
}

async function removeLike(req: Request, res: Response, next: NextFunction) {
  try {
    const likeId = parseInt(req.params.likeId);
    await likeServices.removeLikeFromPost(likeId);

    return res.sendStatus(httpStatus.NO_CONTENT);
  } catch (error) {
    next(error);
  }
}

async function getPostLikesController(req: Request, res: Response): Promise<void> {
  const postId = parseInt(req.params.id, 10);

  try {
    const likes = await likeServices.getPostLikes(postId);
    res.status(httpStatus.OK).json(likes);
  } catch (error) {
    console.error('Error retrieving post likes:', error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Failed to retrieve post likes' });
  }
}



const likeController = {
    addLike,
    removeLike,
    getPostLikesController
}

export default likeController;