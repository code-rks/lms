import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
  IsPhoneNumber,
  ValidateNested,
} from 'class-validator';
import { CLASS } from 'src/common/types';
import { IsOnlyDate } from 'src/common/validators/isonlydate.validator';

export class ParentDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsPhoneNumber('IN')
  contactNumber: string;

  @IsOptional()
  @IsEmail()
  emailId: string;

  @IsOptional()
  occupation: string;
}

export class VisitDTO {
  @IsDateString()
  visitDate: Date;

  @IsNotEmpty()
  notes: string;

  @IsNotEmpty()
  addresedBy: string;
}

export class LeadDTO {
  @IsNotEmpty()
  firstName: string;

  @IsOptional()
  middleName: string;
  @IsOptional()
  lastName: string;

  @IsNotEmpty()
  @IsEnum(CLASS)
  class: CLASS;

  @IsOnlyDate()
  @IsOptional()
  dateOfBirth: Date;

  @IsNotEmpty()
  residentialAddress: string;

  @IsNotEmptyObject()
  @ValidateNested({ each: true })
  @Type(() => ParentDTO)
  father: ParentDTO;

  @IsNotEmptyObject()
  @ValidateNested({ each: true })
  @Type(() => ParentDTO)
  mother: ParentDTO;

  @IsOptional()
  leadSource: string;

  @IsOptional()
  notes: string;

  @IsOptional()
  status: string;

  @IsNotEmpty()
  createdBy: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => VisitDTO)
  visits: VisitDTO[];
}
