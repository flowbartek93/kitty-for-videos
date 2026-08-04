import { Type } from 'class-transformer';
import { IsArray, IsDateString, IsNotEmpty, IsNumber, IsPositive, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class NbpRateDto {
  @ApiProperty({ example: 'dolar amerykański' })
  @IsString()
  @IsNotEmpty()
  currency!: string;

  @ApiProperty({ example: 'USD' })
  @IsString()
  @IsNotEmpty()
  code!: string;

  @ApiProperty({ example: 4.1234 })
  @IsNumber({ maxDecimalPlaces: 8 })
  @IsPositive()
  mid!: number;
}

export class NbpTableDto {
  @ApiProperty({ example: 'A' })
  @IsString()
  @IsNotEmpty()
  table!: string;

  @ApiProperty({ example: '150/A/NBP/2026' })
  @IsString()
  @IsNotEmpty()
  no!: string;

  @ApiProperty({ example: '2026-08-04' })
  @IsDateString()
  effectiveDate!: string;

  @ApiProperty({ type: () => NbpRateDto, isArray: true })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NbpRateDto)
  rates!: NbpRateDto[];
}
