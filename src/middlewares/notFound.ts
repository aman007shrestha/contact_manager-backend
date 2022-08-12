import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import CustomError from "../misc/CustomError";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new CustomError(
    `Not Found - ${req.originalUrl}`,
    StatusCodes.NOT_FOUND
  );
  next(error);
};
