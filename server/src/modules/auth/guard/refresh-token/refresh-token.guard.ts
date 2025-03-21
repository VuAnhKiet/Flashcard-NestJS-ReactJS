// import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { ConfigService } from '@nestjs/config';
// import { Request } from 'express';

// @Injectable()
// export class RefreshTokenGuard implements CanActivate {
//   constructor(
//     private jwtService: JwtService,
//     private configService: ConfigService,
//   ) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const request: Request = context.switchToHttp().getRequest();
//     const refreshToken = request.cookies ? request.cookies['refresh_token'] : null;

//     if (!refreshToken) {
//       throw new UnauthorizedException('Refresh token missing');
//     }

//     try {
//       const secret = this.configService.get<string>('JWT_REFRESH_SECRET');
//       const payload = await this.jwtService.verifyAsync(refreshToken, { secret });

//       request['refreshTokenPayload'] = payload;
//       request['refresh_token'] = refreshToken;

//       return true;
//     } catch (error) {
//       throw new UnauthorizedException('Invalid or expired refresh token');
//     }
//   }
// }
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization: string | undefined = request.headers.authorization;

    if (!authorization?.startsWith('Bearer ')) {
      return true;
    }

    const token = authorization.split(' ')[1];
    const secret = this.configService.get<string>('JWT_ACCESS_SECRET');

    try {
      request.tokenPayload = await this.jwtService.verifyAsync(token, { secret });
    } catch {
      return true; 
    }

    return true;
  }
}
