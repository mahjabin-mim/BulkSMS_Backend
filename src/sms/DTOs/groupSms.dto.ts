// src/sms/dto/group-sms.dto.ts
import { IsString, IsNotEmpty, IsArray, IsOptional } from 'class-validator';

export class GroupSmsDto {
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  numbers: string[];

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  @IsOptional()
  link?: string;

  @IsString()
  @IsNotEmpty()
  datetime: string;
}
