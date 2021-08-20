import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { UsersModule } from '../users/users.module'
import { RefreshToken, RefreshTokenSchema } from './refresh-tokens.schema'
import { TokensService } from './tokens.service'
import { RefreshTokenService } from './refresh-tokens.service'
import { AuthenticationController } from './authentication.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { JWTGuard } from './jwt.guard'
import { JwtStrategy } from './jwt.strategy'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: RefreshToken.name, schema: RefreshTokenSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '5m',
      }
    }),
    UsersModule,
  ],
  controllers: [
    AuthenticationController,
  ],
  providers: [
    TokensService,
    RefreshTokenService,
    JwtStrategy
  ],
})
export class AuthenticationModule {}