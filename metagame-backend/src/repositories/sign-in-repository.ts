import { Prisma } from '@prisma/client';
import { prisma } from '../config/database';

async function create(data: Prisma.SessionUncheckedCreateInput) {
  return prisma.session.create({
    data,
  });
}

const signInRepository = {
  create,
};

export default signInRepository;