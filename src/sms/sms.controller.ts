// src/sms/sms.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { SmsService } from './sms.service';
import { SendSmsDto } from './DTOs/sendSms.dto';
import { GroupSmsDto } from './DTOs/groupSms.dto';

@Controller('sms')
export class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @Post('sendSms')
  async sendSms(@Body() data: SendSmsDto): Promise<string> {
    await this.smsService.sendSms(data);
    return `Message sent to ${data.number}`;
  }

  @Post('groupSms')
  async groupSms(@Body() data: GroupSmsDto): Promise<string[]> {
    return await this.smsService.groupSms(data);
  }
}
