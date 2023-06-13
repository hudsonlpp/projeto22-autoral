import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import signInService, { SignInParams } from 'services/sign-in-services';
import signUpService from "services/sign-up-services";
import { logoutUser } from 'services/sign-out-services';
import userService from '../services/user-services';




export async function signIn(req: Request, res: Response,next:NextFunction) {
  const { email, password } = req.body as SignInParams;
  console.log("oioi")
  try {
    const result = await signInService.signIn({ email, password });

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    next(error)
  }
}

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password } = req.body;

  try {
    const user = await signUpService.createUser({ email, password });
    return res.status(httpStatus.CREATED).json({
      id: user.id,
      email: user.email,
    });
  } catch (error) {
    next(error);
  }
};

export async function signOut(req: Request, res: Response,next:NextFunction) {
  try {
    const {token} = res.locals
    await logoutUser(token)
    return res.status(httpStatus.OK).send(token);
  } catch (error) {
    next(error)
  }
}

export async function getUserById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = parseInt(req.params.id);

  try {
    const user = await userService.getUserById(userId);

    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({ message: 'User not found' });
    }

    return res.status(httpStatus.OK).json(user);
  } catch (error) {
    next(error);
  }
}

export async function updateUserById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = parseInt(req.params.id, 10); // Convert id parameter to integer
  console.log("userId:", userId);
  const userData = req.body;

  try {
    const updatedUser = await userService.updateUserById(userId, userData);

    if (!updatedUser) {
      return res.status(httpStatus.NOT_FOUND).json({ message: 'User not found' });
    }

    return res.status(httpStatus.OK).json(updatedUser);
  } catch (error) {
    next(error);
  }
}


export async function deleteUser(req: Request, res: Response, next: NextFunction) {
  const userId = parseInt(req.params.id);

  try {
    await userService.deleteUser(userId);
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
}