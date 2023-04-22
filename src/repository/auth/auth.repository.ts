import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Auth, AuthDocument } from './auth.schema';
import { Model } from 'mongoose';
import { IAuthRepository } from 'src/auth/interface/IAuthRepository';
import { IAuth } from 'src/auth/interface/IAuth';

@Injectable()
export class MongoAuthRepository implements IAuthRepository {
  constructor(@InjectModel(Auth.name) private model: Model<AuthDocument>) {}

  async listUsers(): Promise<IAuth[]> {
    const users = await this.model.find().lean();
    return this.transformFromArrayModel(users);
  }

  async createUser(auth: IAuth): Promise<IAuth> {
    const document = await this.transformToModel(auth);
    const savedDocument = await document.save();
    return await this.transformFromModel(savedDocument);
  }

  async getUser(userId: string): Promise<IAuth> {
    const user = await this.model.findOne({userId}).lean();
    return await this.transformFromModel(user);
  }

  async updateUser(userId: string, user: IAuth): Promise<IAuth> {
    const updatedUser = await this.model.findOneAndUpdate({userId}, { ...user },{new: true}).lean();
    return await this.transformFromModel(updatedUser);
  }

  async transformToModel(auth: IAuth): Promise<AuthDocument> {
    return await this.model.create({
      userId: auth.userId,
      firstName: auth.firstName,
      lastName: auth.lastName,
      phoneNumber: auth.phoneNumber,
      email: auth.email,
      password: auth.password,
      username: auth.username,
    });
  }

  async transformFromModel(auth: Auth): Promise<IAuth> {
    return {
      userId: auth.userId,
      firstName: auth.firstName,
      lastName: auth.lastName,
      phoneNumber: auth.phoneNumber,
      email: auth.email,
      username: auth.username,
    };
  }

  async transformFromArrayModel(auths: AuthDocument[]): Promise<IAuth[]> {
    return Promise.all(
      auths.map(async (auth) => await this.transformFromModel(auth)),
    );
  }
}
