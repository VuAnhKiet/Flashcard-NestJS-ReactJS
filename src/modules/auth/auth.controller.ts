import { Body, Controller, Get, Param, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/dto/auth/login.dto';
import { RegisterDto } from 'src/dto/auth/register.dto';
import { UserEmailDto } from 'src/dto/user/user-email.dto';
import { AuthGuard } from './guard/jwt.guard';
import { Response,Request } from 'express';
import { RefreshTokenGuard } from './guard/refresh-token/refresh-token.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @UseGuards(AuthGuard)
  @Get()
  async getUser(@Req() req:Request|any):Promise<void>{
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response): Promise<any> {
    const { access_token } = await this.authService.login(loginDto, res);
    return access_token;
  }
  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<any> {
    return this.authService.register(registerDto);
  }

  @Post('reset-password')
  async sendMail(@Body() userEmail: UserEmailDto): Promise<string> {
    const { email } = userEmail;
    return this.authService.sendMail(email);
  }

  @Patch('reset-password/:token')
  async resetPassword(
    @Param('token') token: string,
    @Body('newPassword') newPassword: string,
  ) {
    return { message: await this.authService.resetPassword(token, newPassword) };
  }

  @UseGuards(AuthGuard)
  @Post('refresh-access-token')
  async refreshToken(@Req() req: Request|any, @Res() res: Response): Promise<any> {
    const refreshToken = req.refresh_token;
    const payload = req.refreshTokenPayload;
    const { access_token } = await this.authService.refreshAccessToken(refreshToken, payload);
    return { access_token };
  }


  @UseGuards(AuthGuard)
  @Post('logout')
  async logout(@Req() req: Request|any):Promise<{}>{
    const userId = req.tokenPayload.id; 
    await this.authService.logout(userId);
    return { message: 'Logged out successfully' };
  }

}
