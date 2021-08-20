import { BadRequestException, Body, Controller, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/users.dto';
import { UsersService } from './users.service';
import { Response, Request } from 'express'
import { JWTGuard } from 'src/authentication/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersservice: UsersService) {}

  @Get()
  @UseGuards(JWTGuard)
  list(){
    return this.usersservice.findAll();
  }

  @Get(':id')
  @UseGuards(JWTGuard)
  findOne(@Param('id') id: string){
    return this.usersservice.findForUsername(id)
  }
}
