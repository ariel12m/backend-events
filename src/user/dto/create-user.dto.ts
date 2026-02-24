import { ArrayNotEmpty, IsArray, IsEmail, IsInt, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    name: string;
    
    @IsString()
    email: string; 

    @IsString()
    password: string

    @IsString()
    @IsOptional()
    cedula?: string;

    @IsString()
    @IsOptional()
    phone?: string;

    @IsString()
    @IsOptional()
    address?: string;

    @IsString()
    @IsOptional()
    licenseNumber?: string;

    @IsString()
    @IsOptional()
    vehicle?: string;

    @IsArray()
    @ArrayNotEmpty()
    @IsInt({ each: true })
    @IsOptional()
    events?: number[]
}