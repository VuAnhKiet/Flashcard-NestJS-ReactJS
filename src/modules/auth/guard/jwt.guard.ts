import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization: string | undefined = request.headers.authorization;
    const refreshToken = request.cookies?.refresh_token;

    // Check if authorization header is valid
    if (!authorization?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Authorization header missing or invalid');
    }

    // Check if refresh token is present
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token missing');
    }

    const token = authorization.split(' ')[1];
    const secret = this.configService.get<string>('JWT_ACCESS_SECRET');
    const refreshSecret = this.configService.get<string>('JWT_REFRESH_SECRET');

    // Verify the access token
    try {
      request.tokenPayload = await this.jwtService.verifyAsync(token, { secret });
    } catch (error) {
      throw new HttpException({ status: 419, message: 'Access token expired or invalid' }, 419);
    }

    // Verify the refresh token
    try {
      request.refreshTokenPayload = await this.jwtService.verifyAsync(refreshToken, { secret: refreshSecret });
    } catch {
      throw new UnauthorizedException('Refresh token expired or invalid');
    }

    // Attach tokens and their payloads to the request
    request.token = token;
    request.refresh_token = refreshToken;

    return true;
  }
}
