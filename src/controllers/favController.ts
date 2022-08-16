import * as favServices from "../services/favouriteServices";
import { NextFunction, Response } from "express";
import { RequestWithUser } from "../domain/CustomRequest";

/**
 * @desc handle service for retrieving favourites of logged in user
 * @param req
 * @param res
 * @param next
 */
export const getAllFavourites = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user_id as number;
  favServices
    .getAllFavourites(userId)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

/**
 * @desc handle service for setting favourite for logged in user
 * @param req
 * @param res
 * @param next
 */
export const setFavouriteContact = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user_id as number;
  const { contactId } = req.body;
  favServices
    .setFavouriteContact({ contact_id: +contactId, user_account_id: userId })
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

/**
 * @desc handle service to unset favourite for logged in user
 * @param req
 * @param res
 * @param next
 */
export const unsetFavouriteContact = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user_id as number;
  const { contactId } = req.params;
  favServices
    .unsetFavouriteContact({ contact_id: +contactId, user_account_id: userId })
    .then((data) => res.json(data))
    .catch((err) => next(err));
};
