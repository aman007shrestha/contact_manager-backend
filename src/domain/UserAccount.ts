interface IUser {
  id: number;
  email: string;
  password: string;
}
export type IUserToInsert = Omit<IUser, "id">;
export type IReturnedUser = Omit<IUser, "password">;

export default IUser;
