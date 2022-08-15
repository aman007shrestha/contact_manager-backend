import db from "../db/db";
import logger from "../misc/logger";
import CustomError from "../misc/CustomError";
import { IFavouriteContactToInsert } from "../domain/FavouriteContact";

/**
 * @desc database methods for making database changes. Actual database interaction point.
 */
class FavouriteTable {
  public static table = "favourite_account";
  // different methods for interacting database

  /**
   *
   * @param userId whose favourites is to be retrieved
   * @returns list of favourites
   */
  public static async getAllFavourites(userId: number) {
    logger.info(`Getting all favourite contacts for ${userId}`);
    let favouriteAccounts;
    try {
      favouriteAccounts = await db(FavouriteTable.table)
        .where({ user_account_id: userId })
        .select("contact_id");
      return favouriteAccounts;
    } catch (error: any) {
      logger.info(error.message);
    }
  }

  /**
   *
   * @param favouriteData user_id and contact_id
   * @returns newly created favorite contact object
   */
  public static async setFavouriteContact(
    favouriteData: IFavouriteContactToInsert
  ) {
    let favouriteContact;
    try {
      favouriteContact = await db(FavouriteTable.table).insert(favouriteData, [
        "*",
      ]);
    } catch (error: any) {
      logger.info(error.message);
    }
    return favouriteContact;
  }
  /**
   *
   * @param favouriteData of the favourite row which is deleted
   *
   */
  public static async unsetFavouriteContact(
    favouriteData: IFavouriteContactToInsert
  ) {
    logger.info(`unset favorite contact ${favouriteData.contact_id}`);
    try {
      await db(FavouriteTable.table)
        .where({ contact_id: favouriteData.contact_id })
        .where({ user_account_id: favouriteData.user_account_id })
        .delete();
    } catch (error: any) {
      throw new CustomError(error.message, 500);
    }
  }
}

export default FavouriteTable;
