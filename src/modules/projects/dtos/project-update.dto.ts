import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class ProjectUpdateDto {
    @ApiPropertyOptional({ example: "My Portfolio Website" })
    @IsString()
    @IsOptional()
    title?: string;

    @ApiPropertyOptional({ example: "A full-stack portfolio application" })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiPropertyOptional({ example: "https://github.com/user/project" })
    @IsString()
    @IsOptional()
    githubLink?: string;

    @ApiPropertyOptional({ example: "John Doe" })
    @IsString()
    @IsOptional()
    customerName?: string;
}
