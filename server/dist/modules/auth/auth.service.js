"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../../entities/user.entity");
const bcrypt = require("bcrypt");
const typeorm_2 = require("typeorm");
const mail_service_1 = require("./mail/mail.service");
const token_entity_1 = require("../../entities/token.entity");
let AuthService = class AuthService {
    constructor(userRepository, tokenRepository, configService, jwtService, mailService) {
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
        this.configService = configService;
        this.jwtService = jwtService;
        this.mailService = mailService;
    }
    async register(registerDto) {
        const { fullname, email, password } = registerDto;
        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser) {
            throw new common_1.ConflictException('This email is already registered!');
        }
        const existingUsername = await this.userRepository.findOne({ where: { fullname } });
        if (existingUsername) {
            throw new common_1.ConflictException('Please try another username!');
        }
        const newUser = this.userRepository.create({
            fullname,
            email,
            password,
        });
        try {
            await this.userRepository.save(newUser);
            return 'User created successfully!';
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Could not create user');
        }
    }
    async login(loginDto, res) {
        try {
            let refresh_token = '';
            const user = await this.userRepository.findOne({
                where: { fullname: loginDto.fullname },
            });
            if (!user) {
                throw new common_1.UnauthorizedException("User doesn't exist");
            }
            const match = await bcrypt.compare(loginDto.password, user.password);
            if (!match) {
                throw new common_1.UnauthorizedException('Wrong password combination');
            }
            if (!user.refreshToken) {
                refresh_token = await this.generateRefreshToken({ id: user.id, fullname: user.fullname });
            }
            else {
                refresh_token = user.refreshToken;
            }
            const { access_token } = await this.generateAccessToken({
                id: user.id,
                fullname: user.fullname,
            });
            res.cookie('refresh_token', refresh_token, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            res.status(200).json({ access_token });
            return { access_token };
        }
        catch (error) {
            throw new common_1.UnauthorizedException(error);
        }
    }
    async generateAccessToken(payload) {
        const access_token = await this.jwtService.signAsync(payload, {
            secret: this.configService.get('JWT_ACCESS_SECRET'),
            expiresIn: this.configService.get('JWT_ACCESS_EXPIRATION'),
        });
        if (!access_token) {
            throw new common_1.BadRequestException('Failed to verify token');
        }
        return { access_token };
    }
    async generateRefreshToken(payload) {
        const refresh_token = await this.jwtService.signAsync(payload, {
            secret: this.configService.get('JWT_REFRESH_SECRET'),
            expiresIn: this.configService.get('JWT_REFRESH_EXPIRATION')
        });
        if (!refresh_token) {
            throw new common_1.BadRequestException('Failed to verify token');
        }
        await this.userRepository.update({ id: payload.id }, { refreshToken: refresh_token });
        return refresh_token;
    }
    async sendMail(email) {
        return await this.mailService.sendMail(email);
    }
    async resetPassword(token, newPassword) {
        try {
            const tokenEntry = await this.tokenRepository.findOne({ where: { token } });
            if (!tokenEntry) {
                throw new common_1.BadRequestException('Invalid token');
            }
            if (Date.now() > tokenEntry.expiresAt.getTime()) {
                await this.tokenRepository.delete({ token });
                throw new common_1.BadRequestException('Token has expired. Please request a new password reset link.');
            }
            const user = await this.userRepository.findOne({
                where: { id: tokenEntry.user.id },
            });
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
            await this.userRepository.save(user);
            await this.tokenRepository.delete({ token });
            return 'Password has been reset successfully.';
        }
        catch (error) {
            throw error;
        }
    }
    async refreshAccessToken(refreshToken, payload) {
        if (!refreshToken) {
            throw new common_1.UnauthorizedException('Please login again!');
        }
        const user = await this.userRepository.findOne({
            where: {
                id: payload.id
            }
        });
        if (!user) {
            throw new common_1.UnauthorizedException("User doesn't exist");
        }
        const access_token = await this.generateAccessToken({ id: user.id, fullname: user.fullname });
        return { access_token };
    }
    async logout(userId) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        if (!user.refreshToken) {
            throw new common_1.UnauthorizedException('No refresh token found for the user');
        }
        await this.userRepository.update(userId, { refreshToken: null });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(token_entity_1.Token)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        config_1.ConfigService,
        jwt_1.JwtService,
        mail_service_1.MailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map