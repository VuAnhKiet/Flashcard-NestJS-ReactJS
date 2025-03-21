import {
    BadRequestException,
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from 'src/dto/auth/register.dto';
import { User } from 'src/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { LoginDto } from 'src/dto/auth/login.dto';
import { MailService } from './mail/mail.service';
import { Token } from 'src/entities/token.entity';
import { Response } from 'express';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Token) private tokenRepository: Repository<Token>,
        private configService: ConfigService,
        private jwtService: JwtService,
        private mailService: MailService
    ) { }

    async register(registerDto: RegisterDto): Promise<string> {
        const { fullname, email, password } = registerDto;

        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser) {
            throw new ConflictException('This email is already registered!');
        }
        const existingUsername = await this.userRepository.findOne({ where: { fullname } });
        if (existingUsername) {
            throw new ConflictException('Please try another username!');
        }
        const newUser = this.userRepository.create({
            fullname,
            email,
            password,
        });

        try {
            await this.userRepository.save(newUser);
            return 'User created successfully!';
        } catch (error) {
            throw new InternalServerErrorException('Could not create user');
        }
    }

    async login(loginDto: LoginDto, res: Response): Promise<{ access_token: string }> {
        try {
            let refresh_token = '';
            const user = await this.userRepository.findOne({
                where: { fullname: loginDto.fullname },
            });
            if (!user) {
                throw new UnauthorizedException("User doesn't exist");
            }
            const match = await bcrypt.compare(loginDto.password, user.password);
            if (!match) {
                throw new UnauthorizedException('Wrong password combination');
            }
            if (!user.refreshToken) {
                refresh_token = await this.generateRefreshToken({ id: user.id, fullname: user.fullname })
            } else {
                refresh_token = user.refreshToken;
            }
            const { access_token } = await this.generateAccessToken({
                id: user.id,
                fullname: user.fullname,
            });
            res.cookie('refresh_token', refresh_token, {
                httpOnly: true,
                // secure: process.env.NODE_ENV === 'production',
                secure: false,
                sameSite: 'lax',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            res.status(200).json({ access_token });
            return { access_token }
        } catch (error) {
            throw new UnauthorizedException(error);
        }
    }

    private async generateAccessToken(payload: { id: number, fullname: string }) {
        const access_token = await this.jwtService.signAsync(payload, {
            secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
            expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRATION'),
        });
        if (!access_token) {
            throw new BadRequestException('Failed to verify token');
        }
        return { access_token };
    }

    private async generateRefreshToken(payload: { id: number, fullname: string }) {
        const refresh_token = await this.jwtService.signAsync(payload, {
            secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
            expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION')
        });
        if (!refresh_token) {
            throw new BadRequestException('Failed to verify token');
        }
        await this.userRepository.update(
            { id: payload.id },
            { refreshToken: refresh_token }
        )
        return refresh_token;
    }

    async sendMail(email: string): Promise<string> {
        return await this.mailService.sendMail(email);
    }

    async resetPassword(token: string, newPassword: string): Promise<string> {
        try {
            const tokenEntry = await this.tokenRepository.findOne({ where: { token } });
            if (!tokenEntry) {
                throw new BadRequestException('Invalid token');
            }
            if (Date.now() > tokenEntry.expiresAt.getTime()) {
                await this.tokenRepository.delete({ token });
                throw new BadRequestException('Token has expired. Please request a new password reset link.');
            }
            const user = await this.userRepository.findOne({
                where: { id: tokenEntry.user.id },
            });
            if (!user) {
                throw new NotFoundException('User not found');
            }
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
            await this.userRepository.save(user);
            await this.tokenRepository.delete({ token });

            return 'Password has been reset successfully.';
        } catch (error) {
            throw error;
        }
    }

    async refreshAccessToken(refreshToken: string, payload: { id: number, fullname: string }): Promise<any> {
        if (!refreshToken) {
            throw new UnauthorizedException('Please login again!');
        }
        const user = await this.userRepository.findOne({
            where: {
                id: payload.id
            }
        });
        if (!user) {
            throw new UnauthorizedException("User doesn't exist");
        }
        const access_token = await this.generateAccessToken({ id: user.id, fullname: user.fullname });
        return { access_token }
    }

    async logout(userId: number): Promise<void> {
        const user = await this.userRepository.findOne({
            where: { id: userId },
        });
        if (!user) {
            throw new UnauthorizedException('User not found');
        }
        if (!user.refreshToken) {
            throw new UnauthorizedException('No refresh token found for the user');
        }
        await this.userRepository.update(userId, { refreshToken: null });
    }

}

