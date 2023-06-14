import { Router } from "express";
import { authenticateToken } from "middlewares/authentication-middleware";
import postController from "../controllers/post-controllers";

const post = Router();

// Posts:

// POST /posts: Criar um novo post.
// GET /posts/:id: Obter informações de um post específico.
// PUT /posts/:id: Atualizar as informações de um post específico.
// DELETE /posts/:id: Excluir um post específico.
// GET /users/:id/posts: Obter todos os posts de um usuário específico.

post.post("/posts", authenticateToken, postController.createPost)
post.get("/posts/:id", authenticateToken, postController.getPostById);
post.put("/posts/:id", authenticateToken, postController.updatePost)
post.delete("/posts/:id", authenticateToken, postController.deletePost)
post.get("/users/:userId/posts", authenticateToken, postController.getPostsByUserId);


export default post;