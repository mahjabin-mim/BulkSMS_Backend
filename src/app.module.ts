import { Module } from '@nestjs/common';
import { SmsModule } from './sms/sms.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import ormConfig from 'ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(ormConfig),
    SmsModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
