import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class ContactDto {
    @ApiProperty({ example: "John Doe" })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiPropertyOptional({ example: "Acme Corp" })
    @IsString()
    @IsOptional()
    company?: string;

    @ApiProperty({ example: "john@example.com" })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: "I'd like to discuss a potential project." })
    @IsString()
    @IsNotEmpty()
    message: string;
}
