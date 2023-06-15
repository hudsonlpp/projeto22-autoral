import { PrismaClient, Bet } from "@prisma/client";

const prisma = new PrismaClient();

async function createBet(data: Bet): Promise<Bet> {
  try {
    console.log("Creating a new bet:", data);
    const bet = await prisma.bet.create({ data });
    console.log("New bet created:", bet);
    return bet;
  } catch (error) {
    console.error("Error creating bet:", error);
    throw new Error("Failed to create bet.");
  }
}

async function getBetById(id: number): Promise<Bet | null> {
  try {
    console.log("Retrieving bet by ID:", id);
    const bet = await prisma.bet.findUnique({ where: { id } });
    console.log("Retrieved bet:", bet);
    return bet;
  } catch (error) {
    console.error("Error retrieving bet:", error);
    throw new Error("Failed to retrieve bet.");
  }
}

async function updateBet(id: number, data: Partial<Bet>): Promise<Bet | null> {
  try {
    console.log("Updating bet:", id);
    const bet = await prisma.bet.update({ where: { id }, data });
    console.log("Updated bet:", bet);
    return bet;
  } catch (error) {
    console.error("Error updating bet:", error);
    throw new Error("Failed to update bet.");
  }
}

async function deleteBet(id: number): Promise<Bet | null> {
  try {
    console.log("Deleting bet:", id);
    const bet = await prisma.bet.delete({ where: { id } });
    console.log("Deleted bet:", bet);
    return bet;
  } catch (error) {
    console.error("Error deleting bet:", error);
    throw new Error("Failed to delete bet.");
  }
}  

const betRepository = { 
    createBet,
    getBetById,
    updateBet,
    deleteBet
 }

export default betRepository;
