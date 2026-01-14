import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    async resgister(
        @Body() registerDto: RegisterDto,
        @Res({ passthrough: true }) res: Response) {
        const{user,token,message}  = await this.authService.register(registerDto);

        res.cookie('bm_token', token, {
            httpOnly: true,
            sameSite: 'none',
            secure: process.env.NODE_ENV === 'production',
            path: '/',
        })

        return { message,user };
    }

    @Post('login')
    async login(
        @Body() loginDto: LoginDto,
        @Res({ passthrough: true }) res: Response) {

        const { token, user } = await this.authService.login(loginDto);

        res.cookie('bm_token', token, {
            httpOnly: true,
            sameSite: 'none',
            secure: process.env.NODE_ENV === 'production',
            path: '/',
        })

        return { user };
    }

    @Post('logout')
    logout(@Res({ passthrough: true }) res: Response) {
        res.clearCookie('bm_token', { path: '/' });
        return { message: 'Logged out' };
    }
}
