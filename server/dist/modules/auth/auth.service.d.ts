import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from 'src/dto/auth/register.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from 'src/dto/auth/login.dto';
import { MailService } from './mail/mail.service';
import { Token } from 'src/entities/token.entity';
import { Response } from 'express';
export declare class AuthService {
    private userRepository;
    private tokenRepository;
    private configService;
    private jwtService;
    private mailService;
    constructor(userRepository: Repository<User>, tokenRepository: Repository<Token>, configService: ConfigService, jwtService: JwtService, mailService: MailService);
    register(registerDto: RegisterDto): Promise<string>;
    login(loginDto: LoginDto, res: Response): Promise<{
        access_token: string;
    }>;
    private generateAccessToken;
    private generateRefreshToken;
    sendMail(email: string): Promise<string>;
    resetPassword(token: string, newPassword: string): Promise<string>;
    refreshAccessToken(refreshToken: string, payload: {
        id: number;
        fullname: string;
    }): Promise<any>;
    logout(userId: number): Promise<void>;
}
