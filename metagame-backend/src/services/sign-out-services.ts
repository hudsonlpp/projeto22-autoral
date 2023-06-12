import removeExpiredTokens from "repositories/sign-out-repository";
import { Blacklist, User, Prisma } from '@prisma/client';
import signOutRepository from "repositories/sign-out-repository";

export async function logoutUser(token: string) {
  const expiration = new Date();
  expiration.setDate(expiration.getDate() + 1);
  signOutRepository.insertBlacklistedToken({token, expiration})
}