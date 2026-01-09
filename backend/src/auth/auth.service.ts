import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/registe.dto';
import { comparePassword, hashPassword } from 'src/common/utils/bcrypt.util';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ){}

    private generateToken(userId:string,email:string):string{
        const payload = {sub:userId,email};
        return this.jwtService.sign(payload);
    }


    async register(registerDto:RegisterDto){     
        var existingUser =  await this.userService.findByEmail(registerDto.email);

        if(existingUser) throw new ConflictException('The user alredy exist.');

        const hashedPassword = await hashPassword(registerDto.password);

        const user = await this.userService.create({
            ...registerDto,
            password:hashedPassword,
        });

        const {password,...result} =  user;

        const token = this.generateToken(user.id,user.email);

        return{
            message: 'User created with successful.',
            user: result,
            access_token: token
        }
    }

    async login(loginDto:LoginDto){
        var user = await this.userService.findByEmail(loginDto.email);
        
        if(!user) throw new UnauthorizedException('Email or password invalid.');

        const isPasswordValid = await comparePassword(loginDto.password,user.password);

        if(!isPasswordValid) throw new UnauthorizedException('Email or password invalid.');

        const token = this.generateToken(user.id,user.email);

        return{
            access_token: token,
            user:{
                id:user.id,
                email: user.email,
                name:user.name
            }
        }


    }
}
