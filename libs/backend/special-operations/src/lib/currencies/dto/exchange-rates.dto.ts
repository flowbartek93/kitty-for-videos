import { Type } from 'class-transformer';
import { IsArray, IsDateString, IsNotEmpty, IsNumber, IsPositive, IsString, ValidateNested } from 'class-validator';

export class NbpRateDto {
  @IsString()
  @IsNotEmpty()
  currency!: string;

  @IsString()
  @IsNotEmpty()
  code!: string;

  @IsNumber({ maxDecimalPlaces: 8 })
  @IsPositive()
  mid!: number;
}

export class NbpTableDto {
  @IsString()
  @IsNotEmpty()
  table!: string;

  @IsString()
  @IsNotEmpty()
  no!: string;

  @IsDateString()
  effectiveDate!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NbpRateDto)
  rates!: NbpRateDto[];
}
