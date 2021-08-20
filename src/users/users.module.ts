import { JwtStrategy } from './../authentication/jwt.strategy';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UsersSchema } from './users.schema';
import { JWTGuard } from 'src/authentication/jwt.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UsersSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '5m',
      }
    }),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    JwtStrategy
  ],
  exports: [UsersService]
})
export class UsersModule {}