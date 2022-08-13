// import { StatusCodes } from "http-status-codes";
import db from "../db/db";
import IUserInfo, { IUserInfoToInsert } from "../domain/UserInfo";
import logger from "../misc/logger";
import CustomError from "../misc/CustomError";

class UserInfoTable {
  public static table = "user_info";
  // Methods
  public static async getAllUserInfo() {
    let usersInfo;
    try {
      usersInfo = await db(UserInfoTable.table).select();
      return usersInfo;
    } catch (error: any) {
      logger.info(error.message);
    }
  }
  public static async getUserInfoById(
    user_info_id: number
  ): Promise<IUserInfo> {
    const userInfo = await db(UserInfoTable.table)
      .where({ user_info_id })
      .select()
      .first();
    return userInfo;
  }

  public static async createUserInfo(userInfo: IUserInfoToInsert) {
    logger.info(`Database query to insert user info`);
    let newUserInfo;
    try {
      newUserInfo = await db(UserInfoTable.table).insert(userInfo, ["*"]);
      return newUserInfo;
    } catch (error: any) {
      throw new CustomError(error.message, 500);
    }
  }

  public static async updateUserInfo(userInfo: IUserInfo) {
    logger.info(`Database Update for userInfo ${userInfo.email}`);
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

  public static async deleteUserInfo(userInfoId: number): Promise<void> {
    logger.info(`Database Delete for userInfo ${userInfoId}`);
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
