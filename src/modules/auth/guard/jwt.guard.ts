import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const headers = request.headers;
      const authorization: string | undefined = headers.authorization;

      if (!authorization || !authorization.startsWith('Bearer ')) {
        throw new UnauthorizedException('Authorization header missing or invalid');
      }

      const token: string = authorization.split(' ')[1];

      if (!token) {
        throw new UnauthorizedException('Token missing');
      }

      const secret = this.configService.get<string>('SECRET');
      const tokenPayload = await this.jwtService.verifyAsync(token, { secret });

      // Attach the token and payload to the request object
      request['token'] = token;
      request['tokenPayload'] = tokenPayload;

      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
