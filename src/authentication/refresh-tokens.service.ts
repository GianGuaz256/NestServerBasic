import { UserDto } from './../users/dto/users.dto';
import { Injectable } from '@nestjs/common';
import { RefreshToken } from './refresh-tokens.schema';
import { User, UsersDocument } from '../users/users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class RefreshTokenService {

  constructor(@InjectModel(RefreshToken.name) private refreshTokenModel: Model<RefreshToken>){}

  public async createRefreshToken(user: User, ttl: number): Promise<RefreshToken> {

    const alreadyToken = this.findTokenByIdString(user.id);

    if(alreadyToken){
      console.info('Delete the old Refresh Token and create a new one')
      this.deleteTokenById(user.id)
    } 

    const expiration = new Date()
    expiration.setTime(expiration.getTime() + ttl)

    let refreshToken: RefreshToken = {
        user_id: user.id,
        is_revoked: false,
        expires: expiration
    }

    const createdRefreshToken = new this.refreshTokenModel(refreshToken)
    return createdRefreshToken.save()    
  }

  public async findTokenById (id: number): Promise<RefreshToken | null> {
    return this.refreshTokenModel.findOne({ id }).exec()
  }

  public async findTokenByIdString (user_id: string): Promise<RefreshToken | null> {
    return this.refreshTokenModel.findOne({ user_id }).exec()
  }

  public async deleteTokenById(user_id: string){
    return this.refreshTokenModel.findOneAndDelete({user_id}).exec();
  }
}
