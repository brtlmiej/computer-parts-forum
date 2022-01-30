import { Body, Controller, Get, Post, Redirect, Render, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from '@nestjs/passport';
import { UnauthenticatedGuard } from './guard/unauthenticated.guard';

@Controller('auth')
export class AuthController {
  constructor(
    protected readonly authService: AuthService
  ) {}

  @Get('/login')
  @Render('login')
  async loginForm() {
    return {};
  }

  @Get('/register')
  @Render('register')
  async registerForm() {
    return {};
  }

  @UseGuards(UnauthenticatedGuard, LocalAuthGuard)
  @Post('/login')
  async login(@Req() req) {
    return req.user;
  }

  @Post('/register')
  @Redirect('/login')
  async register(@Body() body: RegisterDto) {
    return await this.authService.register(
      body.email,
      body.password,
      body.firstName,
      body.lastName
    )
  }

}
