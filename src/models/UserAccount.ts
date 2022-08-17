import db from "../db/db";
import CustomError from "../misc/CustomError";
import IUser, { IReturnedUser, IUserToInsert } from "../domain/UserAccount";
import { USER_ACCOUNT_TABLE } from "../constants/constants";
import { USER_ACCOUNT_SCHEMA } from "../constants/constants";

/**
 * @desc database methods for making database changes. Actual database interaction point.
 */
class UserAccount {
  public static table = USER_ACCOUNT_TABLE;
  // different methods for interacting database

  /**
   *
   * @desc Insert User Into database
   * @param user: user object {name, password}
   * @returns inserted user
   */
  public static async createUser(user: IUserToInsert) {
    let createdUser;
    try {
      createdUser = await db(UserAccount.table).insert(user, [
        USER_ACCOUNT_SCHEMA.ID,
        USER_ACCOUNT_SCHEMA.EMAIL,
      ]);
      return createdUser;
    } catch (error: any) {
      throw new CustomError(error.message, 500);
    }
  }

  /**
   *
   * @param email email upon which database is to be queried
   * @returns user object {id, email, password}
   */
  public static async getUserByEmail(email: string): Promise<IUser> {
    const user = await db(UserAccount.table).where({ email }).select().first();
    return user;
  }

  /**
   *
   * @param id: id based on which user is to be returned
   * @returns user object from database
   */
  public static async getUserById(id: number): Promise<IReturnedUser> {
    const user = await db(UserAccount.table).where({ id }).select().first();
    return user;
  }
}

export default UserAccount;
