import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from 'src/dto/auth/register.dto';
import { User } from 'src/entities/user.entity';
import * as bcrypt from 'bcrypt';
import * as jsonwebtoken from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { LoginDto } from 'src/dto/auth/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private configService: ConfigService,
        private jwtService: JwtService
    ) { }

    async register(registerDto: RegisterDto): Promise<string> {
        const user = await this.userRepository.findOne({
            where: [
                { fullname: registerDto.fullname },
                { email: registerDto.email },
            ],
        });
        // If a user is found with the same fullname or email
        if (user) {
            if (user.fullname === registerDto.fullname) {
                throw new ConflictException('Please try another username!');
            }
            if (user.email === registerDto.email) {
                throw new ConflictException('This email is already registered!');
            }
        }
        // If no user is found, hash the password and create the new user
        try {
            const hash = await bcrypt.hash(registerDto.password, 10);
            await this.userRepository.save({
                fullname: registerDto.fullname,
                password: hash,
                email: registerDto.email,
            });
            return 'Create success!';
        } catch (error) {
            throw new InternalServerErrorException('Could not create user');
        }
    }

    async login(loginDto: LoginDto): Promise<{}> {
        const user = await this.userRepository.findOne(
            {
                where:
                {
                    fullname: loginDto.fullname
                }
            });

        if (!user) {
            throw new UnauthorizedException("User doesn't exist");
        }

        // Compare the password with the hashed password
        const match = await bcrypt.compare(loginDto.password, user.password);
        if (!match) {
            throw new UnauthorizedException('Wrong username and password combination');
        }

        return this.generateToken({ fullname: user.fullname, id: user.id });
    }

    private async generateToken(payload: { id: number, fullname: string }) {
        const access_token = await this.jwtService.signAsync(payload, {
            secret: this.configService.get<string>('JWT_SECRET'),
            expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRATION'),
        });
        const refresh_token = await this.jwtService.signAsync(payload, {
            secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
            expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION')
        });
        await this.userRepository.update(
            {id:payload.id},
            { refreshToken: refresh_token }
        )

        return { access_token, refresh_token };
    }

}

