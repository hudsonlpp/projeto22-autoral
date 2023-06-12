import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import signInService, { SignInParams } from 'services/sign-in-services';
import { logoutUser } from 'services/sign-out-services';

export async function signOut(req: Request, res: Response,next:NextFunction) {
  try {
    const {token} = res.locals
    await logoutUser(token)
    return res.status(httpStatus.OK).send(token);
  } catch (error) {
    next(error)
  }
}