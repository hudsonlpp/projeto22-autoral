import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import signUpService from "services/sign-up-services";

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