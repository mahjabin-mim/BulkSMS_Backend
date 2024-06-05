import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class SendSmsDto {
  @IsString()
  @IsNotEmpty()
  number: string;

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
