import { IsEmail, IsNotEmpty, IsPhoneNumber } from "class-validator";

export class CreateUserDTO {
    @IsNotEmpty()
    firstName: string;

    lastName: string;

    @IsNotEmpty()
    @IsPhoneNumber('IN')
    phoneNumber: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}