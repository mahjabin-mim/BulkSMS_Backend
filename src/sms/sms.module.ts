import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SmsService } from './sms.service';
import { SmsController } from './sms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { History } from 'src/entities/history.entity';

@Module({
  imports: [HttpModule,TypeOrmModule.forFeature([History])],
  controllers: [SmsController],
  providers: [SmsService],
})
export class SmsModule {}
