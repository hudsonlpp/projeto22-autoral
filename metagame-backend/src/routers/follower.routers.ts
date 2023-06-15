import { Router } from "express";
import { authenticateToken } from "middlewares/authentication-middleware";
import followerController from "controllers/follower-controllers";

const follower = Router();

follower.post("/users/:id/followers", authenticateToken, followerController.createFollower)
follower.delete("/users/:id/followers/:followerId", authenticateToken, followerController.unfollow)
follower.get("/users/:id/followers", authenticateToken, followerController.getFollowers);
follower.get("/users/:id/following", authenticateToken, followerController.getFollowing);


export default follower;
// POST /users/:id/followers: Seguir um usuário específico.
// DELETE /users/:id/followers/:followerId: Deixar de seguir um usuário específico.
// GET /users/:id/followers: Obter todos os seguidores de um usuário específico.
// GET /users/:id/following: Obter todos os usuários que um usuário específico está seguindo.

