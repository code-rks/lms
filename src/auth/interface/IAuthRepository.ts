import { IAuth } from './IAuth';

export interface IAuthRepository {
  listUsers(): Promise<IAuth[]>;
  createUser(auth: IAuth): Promise<IAuth>;
  getUser(userId: string): Promise<IAuth>;
  updateUser(userId: string, auth: IAuth): Promise<IAuth>;
}

export const IAuthRepository = Symbol('IAuthRepository');
