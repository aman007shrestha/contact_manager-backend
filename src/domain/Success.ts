interface ISuccess<T> {
  data?: T | T[];
  message: string;
}

export interface ILoginSuccess {
  accessToken: string;
  id: number;
  email: string;
}
export default ISuccess;
