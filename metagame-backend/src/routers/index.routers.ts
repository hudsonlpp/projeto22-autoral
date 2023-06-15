import { Router } from "express";
import auth from "./auth.routers";
import post from "./post.routers";
import like from "./like.routers";
import bets from "./bet.router";

const router = Router();

router.use(auth);
router.use(post);
router.use(like);
router.use(bets);
router.get("/health", (_req, res) => res.send("OK!"))
router.all("*", (_req, res) => res.status(404).send({ message: "Not Found" }));

export default router;

// POST /users: Criar um novo usuário.
// POST /login: Autenticar um usuário.
// GET /users/:id: Obter informações de um usuário específico.
// PUT /users/:id: Atualizar as informações de um usuário específico.
// DELETE /users/:id: Excluir um usuário específico.
// Posts:

// POST /posts: Criar um novo post.
// GET /posts/:id: Obter informações de um post específico.
// PUT /posts/:id: Atualizar as informações de um post específico.
// DELETE /posts/:id: Excluir um post específico.
// GET /users/:id/posts: Obter todos os posts de um usuário específico.
// Likes:

// POST /posts/:id/likes: Adicionar um like a um post específico.
// DELETE /posts/:id/likes/:likeId: Remover um like de um post específico.
// GET /posts/:id/likes: Obter todos os likes de um post específico.
// Apostas (Bets):

// POST /bets: Realizar uma nova aposta.
// GET /bets/:id: Obter informações de uma aposta específica.
// PUT /bets/:id: Atualizar as informações de uma aposta específica.
// DELETE /bets/:id: Excluir uma aposta específica.
// GET /users/:id/bets: Obter todas as apostas de um usuário específico.
// Seguidores (Followers):

// POST /users/:id/followers: Seguir um usuário específico.
// DELETE /users/:id/followers/:followerId: Deixar de seguir um usuário específico.
// GET /users/:id/followers: Obter todos os seguidores de um usuário específico.
// GET /users/:id/following: Obter todos os usuários que um usuário específico está seguindo.
// Ranking:

// GET /ranking: Obter o ranking global dos usuários.
// GET /users/:id/ranking: Obter a posição de um usuário específico no ranking.