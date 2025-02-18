import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/dto/auth/login.dto';
import { RegisterDto } from 'src/dto/auth/register.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Post('login')
    login(@Body() loginDto:LoginDto):Promise<any>{
        return this.authService.login(loginDto);
    }

    @Post('register')
    register(@Body() registerDto:RegisterDto):Promise<any>{
        return this.authService.register(registerDto);
    }
}
