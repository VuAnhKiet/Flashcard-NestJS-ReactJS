import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity'; 
import { Token } from 'src/entities/token.entity';
import { NotFoundException, InternalServerErrorException } from '@nestjs/common';
import * as crypto from 'crypto';
import { LessThan, Repository } from 'typeorm';
import * as nodemailer from 'nodemailer';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MailService {
  private transporter:any;

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Token) private tokenRepository:Repository<Token>,
  ) {
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

  async sendMail(email: string): Promise<string> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.tokenRepository.delete({
      user: { id: user.id },
      expiresAt: LessThan(new Date()),
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
    } catch (error) {
      throw new InternalServerErrorException('Error sending email');
    }
  }
}
