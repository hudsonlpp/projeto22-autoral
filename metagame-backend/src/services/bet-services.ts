import { Bet } from "@prisma/client";
import betRepository from "../repositories/bet-repository";

async function createBet(data: Bet): Promise<Bet> {
  console.log("Creating a new bet...");
  const bet = await betRepository.createBet(data);
  console.log("New bet created!");
  return bet;
}

async function getBetById(id: number): Promise<Bet | null> {
    console.log("Retrieving bet by ID...");
    const bet = await betRepository.getBetById(id);
    console.log("Retrieved bet by ID!");
    return bet;
  }

async function updateBet(id: number, data: Partial<Bet>): Promise<Bet | null> {
  console.log("Updating bet...");
  const bet = await betRepository.updateBet(id, data);
  console.log("Updated bet!");
  return bet;
}

async function deleteBet(id: number): Promise<Bet | null> {
  console.log("Deleting bet...");
  const bet = await betRepository.deleteBet(id);
  console.log("Deleted bet!");
  return bet;
}

async function getUserBets(userId: number): Promise<Bet[]> {
  console.log("Fetching user bets...");
  const bets = await betRepository.getUserBets(userId);
  console.log("User bets fetched!");
  return bets;
}

const betService = {
    createBet,
    getBetById,
    updateBet,
    deleteBet,
    getUserBets
}
export default betService;
