import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import { duplicatedEmailError } from 'errors/duplicated-email-error';
import signUpRepository from 'repositories/sign-up-repository';


export async function createUser({ email, password }: CreateUserParams): Promise<User> {

  await validateUniqueEmail(email);

  const hashedPassword = await bcrypt.hash(password, 12);
  return signUpRepository.create({
    email,
    password: hashedPassword,
  });
}

async function validateUniqueEmail(email: string) {
  const userWithSameEmail = await signUpRepository.findByEmail(email);
  if (userWithSameEmail) {
    throw duplicatedEmailError();
  }
}

export type CreateUserParams = Pick<User, 'email' | 'password'>;

const signUpService = {
  createUser,
};

export default signUpService;