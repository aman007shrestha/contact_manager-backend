import { StatusCodes } from "http-status-codes";
import { NextFunction, Response, Request } from "express";
import { RequestWithUser } from "../domain/CustomRequest";
import CustomError from "../misc/CustomError";
import * as userInfoServices from "../services/userInfoServices";
import { IUserInfoToInsert } from "../domain/UserInfo";
import logger from "../misc/logger";

export const getAllUserInfo = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  userInfoServices
    .getAllUserInfo()
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

export const createUserInfo = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const { name, email, contacts, image, share }: IUserInfoToInsert = req.body;
  console.log(name, email, contacts);

  if (!name || !email || !contacts) {
    throw new CustomError("Input All Fields", StatusCodes.BAD_REQUEST);
  }
  const user_account_id = req.user_id as number;
  userInfoServices
    .createUserInfo({
      name,
      email,
      contacts,
      image: image ? image : "",
      share: share ? share : 0,
      user_account_id,
    })
    .then((data) => res.status(StatusCodes.CREATED).json(data))
    .catch((err) => {
      next(err);
    });
};

export const updateUserInfo = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  logger.info(`Controller updateUserInf initiated for ${req.user_id}`);
  const { userInfoId } = req.params;
  const { name, email, contacts, image, share }: IUserInfoToInsert = req.body;
  if (!name || !email || !contacts) {
    throw new CustomError("Input All Fields", StatusCodes.BAD_REQUEST);
  }
  const user_account_id = req.user_id as number;
  userInfoServices
    .updateUserInfo({
      user_info_id: +userInfoId,
      name,
      email,
      contacts,
      image: image ? image : "",
      share: share ? share : 0,
      user_account_id,
    })
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

export const deleteUserInfo = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  logger.info(`Controller deleteUserInfo initiated for ${req.user_id}`);
  const { userInfoId } = req.params;

  const user_account_id = req.user_id as number;
  userInfoServices
    .deleteUserInfo({
      user_info_id: +userInfoId,
      user_account_id,
    })
    .then((data) => res.json(data))
    .catch((err) => next(err));
};
