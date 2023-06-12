import { Router } from "express";
import { createUserSchema } from 'schemas/sign-up-schemas';
import { validateBody } from 'middlewares/validation-middleware';
import { createUser } from 'controllers/sign-up-controllers';
import { signIn } from 'controllers/sign-in-controllers';
import { signInSchema } from 'schemas/sign-in-schemas';
import { authenticateToken } from "middlewares/authentication-middleware";
import { signOut } from "controllers/sign-out-controller";

const auth = Router();

auth.post("/signup", validateBody(createUserSchema), createUser)
auth.post("/signin", validateBody(signInSchema), signIn)
auth.post("/signout", authenticateToken, signOut)

export default auth