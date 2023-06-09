import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import signInService, { SignInParams } from 'services/sign-in-services';

export async function signIn(req: Request, res: Response,next:NextFunction) {
  const { email, password } = req.body as SignInParams;

  try {
    const result = await signInService.signIn({ email, password });

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    next(error)
  }
}