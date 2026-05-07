import { IsString } from 'class-validator';

export class OperatorLoginDto {
  @IsString() operatorId: string;
}
