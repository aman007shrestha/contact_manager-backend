import db from "../db/db";
import IUser, { IReturnedUser, IUserToInsert } from "../domain/UserAccount";
import CustomError from "../misc/CustomError";

class UserAccount {
  public static table = "user_account";
  /**
   *
   * @desc POST Method: Insert User Into database
   * @param user: user object {name, password}
   * @returns inserted user
   */
  public static async createUser(user: IUserToInsert) {
    let createdUser;
    console.log(user);

    try {
      createdUser = await db(UserAccount.table).insert(user, ["id", "email"]);
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

  public static async getUserById(id: number): Promise<IReturnedUser> {
    const user = await db(UserAccount.table).where({ id }).select().first();
    return user;
  }
}

export default UserAccount;
