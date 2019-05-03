import { IsString, IsNumber } from 'class-validator';

// DTO (Data Transfer Object) schema
// A DTO is an object that defines how the data will be sent over the network
export class CryptoCurrencyDto {
  @IsString()
  readonly name: string;
  
  @IsNumber()
  readonly amount: number;
}
