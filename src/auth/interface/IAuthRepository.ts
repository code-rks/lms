import { IAuth } from './IAuth';

export interface IAuthRepository {
  listUsers(): Promise<IAuth[]>;
}

export const IAuthRepository = Symbol('IAuthRepository');
