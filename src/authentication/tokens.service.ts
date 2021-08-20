import { UsersService } from './../users/users.service';
import { RefreshTokenService } from './refresh-tokens.service';
import { Injectable, UnprocessableEntityException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { SignOptions, TokenExpiredError } from 'jsonwebtoken'
import { User } from '../users/users.schema'
import { RefreshToken } from './refresh-tokens.schema';

const BASE_OPTIONS: SignOptions = {
    issuer: '',
    audience: ''
}

export interface RefreshTokenPayload {
    jti: number;
    sub: number
}

@Injectable()
export class TokensService {
    private readonly tokens: RefreshTokenService
    private readonly users: UsersService
    private readonly jwt: JwtService

    public constructor(tokens: RefreshTokenService, users: UsersService, jwt: JwtService){
        this.tokens = tokens
        this.users = users
        this.jwt = jwt
    }

    public async generateAccessToken (user: User): Promise<string>{
        const opts: SignOptions = {
            ...BASE_OPTIONS,
            subject: String(user.id),
        }

        return this.jwt.signAsync({}, opts)
    }

    public async generateRefreshToken (user: User, expiresIn: number): Promise<string> {
        const token = await this.tokens.createRefreshToken(user, expiresIn)
    
        const opts: SignOptions = {
          ...BASE_OPTIONS,
          expiresIn,
          subject: String(user.id),
          jwtid: String(token.user_id),
        }
    
        return this.jwt.signAsync({}, opts)
    }

    public async resolveRefreshToken (encoded: string): Promise<{ user: User, token: RefreshToken }> {
        const payload = await this.decodeRefreshToken(encoded)
        const token = await this.getStoredTokenFromRefreshTokenPayload(payload)
    
        if (!token) {
          throw new UnprocessableEntityException('Refresh token not found')
        }
    
        if (token.is_revoked) {
          throw new UnprocessableEntityException('Refresh token revoked')
        }
    
        const user = await this.getUserFromRefreshTokenPayload(payload)
    
        if (!user) {
          throw new UnprocessableEntityException('Refresh token malformed')
        }
    
        return { user, token }
    }

    public async createAccessTokenFromRefreshToken (refresh: string): Promise<{ token: string, user: User }> {
        const { user } = await this.resolveRefreshToken(refresh)

        const token = await this.generateAccessToken(user)

        return { user, token }
    }
    
    private async decodeRefreshToken (token: string): Promise<RefreshTokenPayload> {
        try {
            return this.jwt.verifyAsync(token)
        } catch (e) {
            if (e instanceof TokenExpiredError) {
                throw new UnprocessableEntityException('Refresh token expired')
            } else {
                throw new UnprocessableEntityException('Refresh token malformed') 
            }
        }
    }

    private async getUserFromRefreshTokenPayload (payload: RefreshTokenPayload): Promise<User> {
        const subId = payload.sub

        if (!subId) {
            throw new UnprocessableEntityException('Refresh token malformed')
        }

        return this.users.findForId(subId)
    }

    private async getStoredTokenFromRefreshTokenPayload (payload: RefreshTokenPayload): Promise<RefreshToken | null> {
        const tokenId = payload.jti

        if (!tokenId) {
            throw new UnprocessableEntityException('Refresh token malformed')
        }

        return this.tokens.findTokenById(tokenId)
    }
}