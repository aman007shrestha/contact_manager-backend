import jwt from "jsonwebtoken";
import UserAccountModel from "../models/UserAccount";
import CustomError from "../misc/CustomError";
import { NextFunction, Response } from "express";
import { IDataStoredInToken } from "../domain/Token";
import { RequestWithUser } from "../domain/CustomRequest";
import { StatusCodes } from "http-status-codes";

/**
 * @desc The protextRoute middleware checks if user is authenticated to access the routes.
 * Decodes the accesstoken to know user_id. if exists is authenticated.
 * @param req Custome Request extending express request to include user_id
 * @param res
 * @param next
 */
export const protectedRoute = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as IDataStoredInToken;
      req.user_id = decoded.id;
      // check this id is in database. if no user with that id, user is unauthorized
      const user = await UserAccountModel.getUserById(decoded.id);
      if (!user) {
        next(new CustomError("Not Authorized", StatusCodes.UNAUTHORIZED));
      }
      next();
    } catch (error) {
      next(new CustomError("Not Authorized", StatusCodes.UNAUTHORIZED));
    }
  }
  // if no token in headers user is unauthorized
  if (!token) {
    next(new CustomError("Not Authorized", StatusCodes.UNAUTHORIZED));
  }
};
