import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

async function deleteUserById(userId: number) {
      return prisma.user.delete({
        where: {
          id: userId,
        },
      });
    }


  const UserRepository = {
    deleteUserById
  };
  
  export default UserRepository;