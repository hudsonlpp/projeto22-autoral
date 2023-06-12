// import { Prisma } from '@prisma/client';
import { prisma } from '../config/database';

async function checkIfBlacklisted(token: string):Promise<number> {
  const count = await prisma.blacklist.count({
    where: {
      token: token,
    },
  });
  return count;
}


const signInRepository = {
  checkIfBlacklisted,
};

export default signInRepository;