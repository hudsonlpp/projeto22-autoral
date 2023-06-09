import { Router } from 'express';
import { createUserSchema } from 'schemas/sign-up-schemas';
import { validateBody } from 'middlewares/validation-middleware';
import { createUser } from 'controllers/sign-up-controllers';

const signUpRouter = Router();

signUpRouter.post('/', validateBody(createUserSchema), createUser);

export { signUpRouter };