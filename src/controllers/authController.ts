import logger from "../misc/logger";
import * as authService from "../services/authServices";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

/**
 *
 * @param req
 * @param res
 * @param next
 * @desc handles service for loggin in a user.
 */
export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  logger.info(`controller: Logging in user ${email}`);
  authService
    .login({ email, password })
    .then((data) => res.json(data))
    .catch((err) => {
      err.StatusCodes = StatusCodes.UNAUTHORIZED;
      next(err);
    });
};

/**
 *
 * @param req
 * @param res
 * @param next
 * @desc handles service for registrating a user
 */
export const register = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  logger.info(`controller: registering in user ${email}`);
  authService
    .createUser({ email, password })
    .then((data) => res.status(StatusCodes.CREATED).json(data))
    .catch((err) => {
      next(err);
    });
};
