import UserRepository, { prisma } from '../repositories/user-repository'

 async function getUserById(userId: number) {
  return prisma.user.findUnique({
    where: { id: userId },
  });
};

export const updateUserById = async (userId: number, userData: any) => {
  return prisma.user.update({
    where: { id: userId },
    data: userData,
  });
};

export async function deleteUser(userId: number) {
    return UserRepository.deleteUserById(userId);
  }

const userService = {
    getUserById,
    updateUserById,
    deleteUser
  };

export default userService;