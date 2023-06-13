import { Router } from "express";
import { createUserSchema } from 'schemas/sign-up-schemas';
import { validateBody } from 'middlewares/validation-middleware';
import { createUser,deleteUser,getUserById,signIn, signOut, updateUserById } from 'controllers/auth-controllers';
import { signInSchema } from 'schemas/sign-in-schemas';
import { authenticateToken } from "middlewares/authentication-middleware";

const auth = Router();

auth.post("/signup", validateBody(createUserSchema), createUser)
auth.post("/signin", validateBody(signInSchema), signIn)
auth.post("/signout", authenticateToken, signOut)
auth.get("/users/:id", getUserById)
auth.put("/users/:id", updateUserById)
auth.delete("/users/:id", deleteUser);

export default auth