import { signIn } from 'controllers/sign-in-controllers';
import { Router } from 'express';
import { validateBody } from 'middlewares/validation-middleware';
import { signInSchema } from 'schemas/sign-in-schemas';

const signInRouter = Router();

signInRouter.post('/', validateBody(signInSchema), signIn);

export { signInRouter };