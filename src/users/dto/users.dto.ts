export class UserDto {
    id: string;
    username: string;
    salt: string;
    password: string;
    date: Date;
}

export class CreateUserDto {
    username: string;
    password: string;
}

export class UserMongoDto {
    _id: string;
    username: string;
    salt: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}