import { Router } from "express";
import { authenticateToken } from "middlewares/authentication-middleware";
import betController from "../controllers/bet-controllers";

const bets = Router();

// POST /bets: Realizar uma nova aposta.
// GET /bets/:id: Obter informações de uma aposta específica.
// PUT /bets/:id: Atualizar as informações de uma aposta específica.
// DELETE /bets/:id: Excluir uma aposta específica.
// GET /users/:id/bets: Obter todas as apostas de um usuário específico.

bets.post("/bets", authenticateToken, betController.createBet)
bets.get("/bets/:id", authenticateToken, betController.getBetById);
bets.put("/bets/:id", authenticateToken, betController.updateBet)
bets.delete("/bets/:id", authenticateToken, betController.deleteBet)
bets.get("/users/:id/bets", authenticateToken, betController.getUserBets);


export default bets;