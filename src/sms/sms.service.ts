import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { History } from '../entities/history.entity';
import { SendSmsDto } from './DTOs/sendSms.dto';
import { ConfigService } from '@nestjs/config';
import { GroupSmsDto } from './DTOs/groupSms.dto';

@Injectable()
export class SmsService {
  private readonly userid: string;
  private readonly password: string;
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(History)
    private readonly historyRepository: Repository<History>,
    private readonly configService: ConfigService,
  ) {
    this.userid = this.configService.get<string>('SMS_USERID');
    this.password = this.configService.get<string>('SMS_PASSWORD');
  }

  async sendSms(data: SendSmsDto): Promise<string> {
    const fullMessage = data.link ? `${data.message} ${data.link}` : data.message;
    const encodedMessage = encodeURIComponent(fullMessage);
    const url = `http://66.45.237.70/api.php?username=${this.userid}&password=${this.password}&number=${data.number}&message=${encodedMessage}`;

    console.log(`Generated URL: ${url}`);

    const history = new History();
    history.ownerid = this.userid;
    history.to = data.number;
    history.message = fullMessage;
    history.datetime = data.datetime;

    try {
      const response = await lastValueFrom(this.httpService.get(url).pipe(
        catchError((error) => {
          history.status = "Failed";
          this.historyRepository.save(history);
          throw new Error(`Error sending SMS: ${error.message}`);
        })
      ));

      const responseData = response.data;
      console.log(`Response from SMS API: ${responseData}`);

      if (responseData.startsWith('1101')) {
        history.status = "Delivered";
        await this.historyRepository.save(history);
        return `Message sent to ${data.number}`;
      } else {
        history.status = "Failed";
        await this.historyRepository.save(history);
        throw new Error(`Error sending SMS: ${responseData}`);
      }
    } catch (error) {
      history.status = "Failed";
      await this.historyRepository.save(history);
      throw new Error(`Error sending SMS: ${error.message}`);
    }
  }

  async groupSms(data : GroupSmsDto): Promise<string[]> {
    const results = [];
    for (const number of data.numbers) {
      try {
        const sendSmsDto: SendSmsDto = {
          number: number,
          message: data.message,
          link: data.link,
          datetime: data.datetime,
        };
        const result = await this.sendSms(sendSmsDto);
        results.push(result);
      } catch (error) {
        results.push(`Failed to send SMS to ${number}: ${error.message}`);
      }
    }
    return results;
  }
}
