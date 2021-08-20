import { RegisterRequest } from './../request';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UsersDocument } from './users.schema';
import { Model } from 'mongoose';
import { UserDto, CreateUserDto } from './dto/users.dto';
import { hash, genSalt, compare } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {

  private readonly users: typeof User

  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel(User.name) private userModel: Model<UsersDocument>
  ){
    if(connection) console.log('Connected')
  }

  public async checkRequest(request: RegisterRequest): Promise<User>{
    const { username, password } = request

    const alreadyExisting = await this.findForUsername(username)

    if(alreadyExisting){
      throw new UnprocessableEntityException('Username already in use')
    }

    const user: CreateUserDto = {
      username,
      password
    }

    return this.create(user)
  }

  private async create(createUserDto: CreateUserDto): Promise<User> {
    const saltToAdd = await genSalt();

    const UserToPush: UserDto = {
      id: uuidv4(),
      username: createUserDto.username,
      salt: saltToAdd,
      password: await hash(createUserDto.password, saltToAdd),
      date: new Date()
    };
    
    const createdUser = new this.userModel(UserToPush);
    return createdUser.save();
  }

  public async validateCredentials (user: User, password: string): Promise<boolean> {
    return await compare(password, user.password)
  }
  
  public async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  public async findForId (id: number): Promise<User | null> {
    return this.userModel.findOne({ id }).exec()
  }

  public async findForUsername (username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).exec()
  }
}
