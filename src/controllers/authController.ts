import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import * as authService from "../services/authServices";

/**
 *
 * @param req
 * @param res
 * @param next
 * @desc login controller handles promise from login service
 */
export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
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
 * @desc register controller handles promise from register controller
 */
export const register = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  authService
    .createUser({ email, password })
    .then((data) => res.status(StatusCodes.CREATED).json(data))
    .catch((err) => {
      next(err);
    });
};
