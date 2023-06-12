import { prisma } from '../config/database';
import { Prisma, User, Blacklist } from '@prisma/client';

async function removeExpiredTokens() {
  const currentDate = new Date();
  await prisma.blacklist.deleteMany({
    where: {
      expiration: {
        lte: currentDate,
      },
    },
  });
};


async function insertBlacklistedToken(data: Prisma.BlacklistUncheckedCreateInput){
  const blacklisted = await prisma.blacklist.create({data})
  return blacklisted
}



const signOutRepository = {removeExpiredTokens, insertBlacklistedToken}
export default signOutRepository