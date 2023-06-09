import Joi from 'joi';
import { SignInParams } from '../services/sign-in-services'

export const signInSchema = Joi.object<SignInParams>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});