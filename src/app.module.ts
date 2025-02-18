import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceOptions } from './config/data-source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardModule } from './modules/card/card.module';
import { UserModule } from './modules/user/user.module';
import { GroupCardModule } from './modules/group-card/group-card.module';
import { ShareCardSectionModule } from './modules/share-card-section/share-card-section.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    CardModule,
    GroupCardModule,
    ShareCardSectionModule,
    AuthModule,
    ConfigModule.forRoot(
      {
        isGlobal: true,
      }
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
