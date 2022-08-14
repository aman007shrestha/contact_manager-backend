export default interface IUserInfo {
  user_info_id: number;
  name: string;
  email: string;
  contacts: object;
  image: string;
  share: number;
  user_account_id: number;
}
export interface IDeleteUserInfo {
  user_info_id: number;
  user_account_id: number;
}
export type IAddToContact = IDeleteUserInfo;
export type IUserInfoToInsert = Omit<IUserInfo, "user_info_id">;
