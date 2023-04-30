import { IsDateString, IsNotEmpty } from 'class-validator';

export class UpdateVisitDTO {
  @IsNotEmpty()
  visitId: string;

  @IsDateString()
  @IsNotEmpty()
  visitDate: Date;

  @IsNotEmpty()
  notes: string;

  @IsNotEmpty()
  addressedBy: string;
}
