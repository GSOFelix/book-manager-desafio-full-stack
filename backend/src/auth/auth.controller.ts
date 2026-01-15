import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import type { Response } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    async resgister(@Body() registerDto: RegisterDto) {
        return await this.authService.register(registerDto)
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto,) {

        return await this.authService.login(loginDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('validate')
    async validate() {
        return { message: 'Token válido' };
    }

}
