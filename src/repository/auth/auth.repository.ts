import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Auth, AuthDocument } from './auth.schema';
import { Model } from 'mongoose';
import { IAuthRepository } from 'src/auth/interface/IAuthRepository';
import { IAuth } from 'src/auth/interface/IAuth';

@Injectable()
export class MongoAuthRepository implements IAuthRepository {
  constructor(@InjectModel(Auth.name) private model: Model<AuthDocument>) {}

  async listUsers(): Promise<IAuth[]> {
    return await this.model.find().lean();
  }
}
