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
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../../../entities/user.entity");
const token_entity_1 = require("../../../entities/token.entity");
const common_2 = require("@nestjs/common");
const crypto = require("crypto");
const typeorm_1 = require("typeorm");
const nodemailer = require("nodemailer");
const typeorm_2 = require("@nestjs/typeorm");
let MailService = class MailService {
    constructor(userRepository, tokenRepository) {
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
    }
    async sendMail(email) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new common_2.NotFoundException('User not found');
        }
        await this.tokenRepository.delete({
            user: { id: user.id },
            expiresAt: (0, typeorm_1.LessThan)(new Date()),
        });
        const token = crypto.randomBytes(16).toString('hex');
        const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;
        const newToken = this.tokenRepository.create({
            user,
            token,
            expiresAt: new Date(Date.now() + 3600000),
        });
        await this.tokenRepository.save(newToken);
        try {
            await this.transporter.sendMail({
                from: process.env.EMAIL,
                to: email,
                subject: 'Password Reset',
                text: `Click this link to reset your password: ${resetLink}`,
            });
            return 'Reset link sent';
        }
        catch (error) {
            throw new common_2.InternalServerErrorException('Error sending email');
        }
    }
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_2.InjectRepository)(token_entity_1.Token)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], MailService);
//# sourceMappingURL=mail.service.js.map