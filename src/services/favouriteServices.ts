import logger from "../misc/logger";
import ISuccess from "../domain/Success";
import CustomError from "../misc/CustomError";
import ContactModel from "../models/Contact";
import FavouriteModel from "../models/FavouriteAccount";
import { StatusCodes } from "http-status-codes";
import {
  IFavouriteContact,
  IFavouriteContactToInsert,
} from "../domain/FavouriteContact";
// import IContact from "../domain/Contact";

/**
 * @desc makes db get query for all favourite contact associated to logged in user
 * @returns object with data and message
 */
export const getAllFavourites = async (
  userId: number
): Promise<ISuccess<IFavouriteContact[]>> => {
  logger.info(`Getting All Favourites for ${userId}`);
  const favourites = await FavouriteModel.getAllFavourites(userId);
  return {
    data: favourites,
    message: "favourites fetched successfully",
  };
};

/**
 *
 * @param favouriteData : payload which is to be provided for set favourite
 * @returns object with data and message
 */
export const setFavouriteContact = async (
  favouriteData: IFavouriteContactToInsert
): Promise<ISuccess<IFavouriteContact>> => {
  logger.info(`Creating favourite contact`);
  const existingContact = await ContactModel.getContactById(
    favouriteData.contact_id
  );
  if (!existingContact) {
    throw new CustomError(`Contact does not exist`, StatusCodes.NOT_FOUND);
  }
  if (favouriteData.user_account_id !== existingContact.user_account_id) {
    throw new CustomError(
      `You are not authorized to set other's contact as your favorite`,
      StatusCodes.UNAUTHORIZED
    );
  }
  const newFavContact = await FavouriteModel.setFavouriteContact({
    contact_id: favouriteData.contact_id,
    user_account_id: favouriteData.user_account_id,
  });
  return {
    data: newFavContact,
    message: "New Favorite Registered Successfully",
  };
};

/**
 *
 * @param favouriteData : payload which is to be provided for unset method in db model
 * @returns object with data and message
 */
export const unsetFavouriteContact = async (
  favouriteData: IFavouriteContactToInsert
): Promise<ISuccess<IFavouriteContact>> => {
  logger.info(`unsetting favourite contact`);
  const existingContact = await ContactModel.getContactById(
    favouriteData.contact_id
  );
  if (favouriteData.user_account_id !== existingContact.user_account_id) {
    throw new CustomError(
      `You are not authorized to unset other's contact as your favorite`,
      StatusCodes.UNAUTHORIZED
    );
  }
  await FavouriteModel.unsetFavouriteContact(favouriteData);
  return {
    message: "Unfaavorite Registered Successfully",
  };
};
