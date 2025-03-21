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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let AuthGuard = class AuthGuard {
    constructor(jwtService, configService) {
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const authorization = request.headers.authorization;
        const refreshToken = request.cookies?.refresh_token;
        if (!authorization?.startsWith('Bearer ')) {
            throw new common_1.UnauthorizedException('Authorization header missing or invalid');
        }
        if (!refreshToken) {
            throw new common_1.UnauthorizedException('Refresh token missing');
        }
        const token = authorization.split(' ')[1];
        const secret = this.configService.get('JWT_ACCESS_SECRET');
        const refreshSecret = this.configService.get('JWT_REFRESH_SECRET');
        try {
            request.tokenPayload = await this.jwtService.verifyAsync(token, { secret });
        }
        catch (error) {
            throw new common_1.HttpException({ status: 419, message: 'Access token expired or invalid' }, 419);
        }
        try {
            request.refreshTokenPayload = await this.jwtService.verifyAsync(refreshToken, { secret: refreshSecret });
        }
        catch {
            throw new common_1.UnauthorizedException('Refresh token expired or invalid');
        }
        request.token = token;
        request.refresh_token = refreshToken;
        return true;
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService])
], AuthGuard);
//# sourceMappingURL=jwt.guard.js.map