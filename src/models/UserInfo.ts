import db from "../db/db";
import CustomError from "../misc/CustomError";
import logger from "../misc/logger";
import IUserInfo, { IUserInfoToInsert } from "../domain/UserInfo";
import { USER_INFO_TABLE } from "../constants/constants";
import { USER_INFO_SCHEMA } from "../constants/constants";
/**
 * @desc database methods for making database changes. Actual database interaction point.
 */
class UserInfoTable {
  public static table = USER_INFO_TABLE;
  // different methods for interacting database

  /**
   * @desc queries database to return all users from database
   * @returns list of user_info objects
   */
  public static async getAllUserInfo() {
    logger.info(`Getting all users info`);
    let usersInfo;
    try {
      usersInfo = await db(UserInfoTable.table)
        .where({ share: 1 })
        .select()
        .orderBy(USER_INFO_SCHEMA.NAME);
      return usersInfo;
    } catch (error: any) {
      logger.info(error.message);
    }
  }

  /**
   * @desc queries database to return self user info from database
   * @returns user_info objects
   */
  public static async getSelfInfo(user_account_id: number) {
    logger.info(`Getting self users info`);
    let userInfo;
    try {
      userInfo = await db(UserInfoTable.table)
        .where({ user_account_id })
        .select()
        .first();
      if (!userInfo) {
        return [];
      }
      return [userInfo];
    } catch (error: any) {
      logger.info(error.message);
    }
  }

  /**
   *
   * @param user_info_id :id based on which user_info object is to be queried
   * @returns user_info object
   */
  public static async getUserInfoById(
    user_info_id: number
  ): Promise<IUserInfo> {
    logger.info(`getting user info for ${user_info_id} user`);
    const userInfo = await db(UserInfoTable.table)
      .where({ user_info_id })
      .select()
      .first();
    return userInfo;
  }

  /**
   *
   * @param userInfo : Data which is to be inserted into database
   * @returns newly inserted user_info object
   */
  public static async createUserInfo(userInfo: IUserInfoToInsert) {
    logger.info(`database: creating user_info`);
    let newUserInfo;
    try {
      newUserInfo = await db(UserInfoTable.table).insert(userInfo, ["*"]);
      return newUserInfo;
    } catch (error: any) {
      throw new CustomError(error.message, 500);
    }
  }

  /**
   *
   * @param userInfo : info with which user_info object is to be updated
   * @returns updated user_info object
   */
  public static async updateUserInfo(userInfo: IUserInfo) {
    logger.info(`database: Update for userInfo ${userInfo.email}`);
    let updatedUser;
    try {
      updatedUser = await db(UserInfoTable.table)
        .where({ user_info_id: userInfo.user_info_id })
        .update(userInfo)
        .returning(["*"]);
      return updatedUser;
    } catch (error: any) {
      throw new CustomError(error.message, 500);
    }
  }

  /**
   *
   * @param userInfoId :id whose user_info object is to be deleted
   */
  public static async deleteUserInfo(userInfoId: number): Promise<void> {
    logger.info(`database: Delete for userInfo ${userInfoId}`);
    try {
      await db(UserInfoTable.table)
        .where({ user_info_id: userInfoId })
        .delete();
    } catch (error: any) {
      throw new CustomError(error.message, 500);
    }
  }
}
export default UserInfoTable;
