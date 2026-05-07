import { IsString, IsEmail, IsOptional } from 'class-validator';

export class UpdateCustomerDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsString() contactName?: string;
  @IsOptional() @IsEmail() email?: string;
  @IsOptional() @IsString() phone?: string;
  @IsOptional() @IsString() billingAddress?: string;
  @IsOptional() @IsString() shippingAddress?: string;
  @IsOptional() @IsString() notes?: string;
}
