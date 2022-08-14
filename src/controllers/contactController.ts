import logger from "../misc/logger";
import CustomError from "../misc/CustomError";
import * as contactServices from "../services/contactServices";
import { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { RequestWithUser } from "../domain/CustomRequest";
import { IContactToInsert } from "../domain/Contact";

/**
 * @desc passes user_id arg from req to service function, converts the resolved data to json,
 * @param req Customized Request to include user_id property
 * @param res
 * @param next
 */
export const getAllContactsForUser = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user_id as number;
  logger.info(`Controller: getting all contacts for ${req.user_id} user`);
  contactServices
    .getAllContactsForUser(userId)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

/**
 * @desc handles service for creating a contact by logged in user
 * @param req
 * @param res
 * @param next
 */
export const createContact = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  logger.info(`Controller: creating contact for ${req.user_id} user`);
  const { name, email, contacts, image }: IContactToInsert = req.body;
  if (!name || !email || !contacts) {
    throw new CustomError("Input All Fields", StatusCodes.BAD_REQUEST);
  }
  const user_account_id = req.user_id as number;
  contactServices
    .createContact({
      name,
      email,
      contacts,
      image: image ? image : "",
      user_account_id,
    })
    .then((data) => res.status(StatusCodes.CREATED).json(data))
    .catch((err) => {
      next(err);
    });
};

/**
 * @desc handles service for updating a contact for logged in user
 * @param req
 * @param res
 * @param next
 */
export const updateContact = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const { contactId } = req.params;
  logger.info(
    `controller: update contact initiated by ${req.user_id} user for ${contactId} contact`
  );
  const { name, email, contacts, image }: IContactToInsert = req.body;
  if (!name || !email || !contacts) {
    throw new CustomError("Input All Fields", StatusCodes.BAD_REQUEST);
  }
  const user_account_id = req.user_id as number;
  contactServices
    .updateContact({
      contact_id: +contactId,
      name,
      email,
      contacts,
      image: image ? image : "",
      user_account_id,
    })
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

/**
 * @desc handle service for deleting a contact for logged in user
 * @param req
 * @param res
 * @param next
 */
export const deleteContact = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const { contactId } = req.params;
  logger.info(
    `controller: delete contact initiated by ${req.user_id} user for ${contactId} contact `
  );

  const user_account_id = req.user_id as number;
  contactServices
    .deleteContact({
      contact_id: +contactId,
      user_account_id,
    })
    .then((data) => res.json(data))
    .catch((err) => next(err));
};
