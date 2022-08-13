import logger from "../misc/logger";
import CustomError from "../misc/CustomError";
import * as userInfoServices from "../services/userInfoServices";
import { NextFunction, Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import { RequestWithUser } from "../domain/CustomRequest";
import { IUserInfoToInsert } from "../domain/UserInfo";

/**
 * @desc handles service for get user infos
 * @param req
 * @param res
 * @param next
 */
export const getAllUserInfo = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info(`controller: getting all shareable userInfo`);
  userInfoServices
    .getAllUserInfo()
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

/**
 * @desc handles service for creating a userInfo by loggedInUser
 * @param req
 * @param res
 * @param next
 */
export const createUserInfo = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  logger.info(`controller: creating userInfo for ${req.user_id} user`);
  const { name, email, contacts, image, share }: IUserInfoToInsert = req.body;
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

/**
 * @desc handle service for updating a userInfo by logged in user
 * @param req
 * @param res
 * @param next
 */
export const updateUserInfo = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const { userInfoId } = req.params;
  logger.info(
    `controller: update UserInfo initiated by ${req.user_id} for ${userInfoId}`
  );
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

/**
 * @desc handles service for deleting a userInfo by loggedIn user
 * @param req
 * @param res
 * @param next
 */
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

/**
 * @desc handle service for adding user to contact
 * @param req
 * @param res
 * @param next
 */
export const addToContact = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  logger.info(`Controller: adding user to contact for ${req.user_id}`);
  const { userInfoId } = req.params;
  const user_account_id = req.user_id as number;
  userInfoServices
    .addToContact({
      user_info_id: +userInfoId,
      user_account_id,
    })
    .then((data) => res.json(data))
    .catch((err) => next(err));
};
