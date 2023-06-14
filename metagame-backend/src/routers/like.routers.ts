import { Router } from "express";
import { authenticateToken } from "middlewares/authentication-middleware";
import likeController from "controllers/like-controllers";

const like = Router();

like.post("/:id/likes", authenticateToken, likeController.addLike)
like.delete("/posts/:id/likes/:likeId", authenticateToken, likeController.removeLike)
like.get("/posts/:id/likes", authenticateToken, likeController.getPostLikesController);


export default like;