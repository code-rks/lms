import { IAuth } from './IAuth';

export interface IAuthRepository {
  listUsers(): Promise<IAuth[]>;
  createUser(auth: IAuth): Promise<IAuth>;
  getUser(userId: string): Promise<IAuth>;
  updateUser(userId: string, auth: IAuth): Promise<IAuth>;
  findUserUsingUsernameAndPassword(userId: string, password: string);
}

export const IAuthRepository = Symbol('IAuthRepository');
