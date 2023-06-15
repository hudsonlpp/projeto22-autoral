import { Request, Response } from "express";
import { Bet } from "@prisma/client";
import betService from "../services/bet-services";
import httpStatus from "http-status";

async function createBet(req: Request, res: Response): Promise<void> {
  try {
    const data = req.body;
    const bet = await betService.createBet(data);
    res.status(httpStatus.CREATED).json(bet);
  } catch (error) {
    console.error("Error creating bet:", error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "Failed to create bet." });
  }
}

async function getBetById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const betId = parseInt(id);
  
      const bet = await betService.getBetById(betId);
  
      if (!bet) {
        res.status(httpStatus.NOT_FOUND).json({ error: "Bet not found." });
        return;
      }
  
      res.status(httpStatus.OK).json(bet);
    } catch (error) {
      console.error("Error retrieving bet:", error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "Failed to retrieve bet." });
    }
  }

async function updateBet(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const betId = parseInt(id);
    const data = req.body;

    const updatedBet = await betService.updateBet(betId, data);

    if (!updatedBet) {
      res.status(httpStatus.NOT_FOUND).json({ error: "Bet not found." });
      return;
    }

    res.status(httpStatus.OK).json(updatedBet);
  } catch (error) {
    console.error("Error updating bet:", error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "Failed to update bet." });
  }
}

async function deleteBet(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const betId = parseInt(id);

    const deletedBet = await betService.deleteBet(betId);

    if (!deletedBet) {
      res.status(httpStatus.NOT_FOUND).json({ error: "Bet not found." });
      return;
    }

    res.status(httpStatus.OK).json({ message: "Bet deleted successfully." });
  } catch (error) {
    console.error("Error deleting bet:", error);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "Failed to delete bet." });
  }
}

async function getUserBets(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = parseInt(id);
  
      const bets = await betService.getUserBets(userId);
  
      res.status(200).json(bets);
    } catch (error) {
      console.error("Error fetching user bets:", error);
      res.status(500).json({ error: "Failed to fetch user bets." });
    }
  }
  

const BetController = {
    createBet,
    getBetById,
    updateBet,
    deleteBet,
    getUserBets
}

export default BetController;
