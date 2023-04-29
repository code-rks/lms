import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  ValidateNested,
} from 'class-validator';
import { CLASS } from 'src/common/types';
import { IsOnlyDate } from 'src/common/validators/isonlydate.validator';

export class UpdateParentDTO {
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

export class UpdateLeadDTO {
  firstName: string;
  middleName: string;
  lastName: string;

  @IsOptional()
  @IsEnum(CLASS)
  class: CLASS;

  @IsOnlyDate()
  @IsOptional()
  dateOfBirth: Date;

  residentialAddress: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateParentDTO)
  father: UpdateParentDTO;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateParentDTO)
  mother: UpdateParentDTO;

  leadSource: string;
  notes: string;

  @IsOptional()
  status: string;
}
