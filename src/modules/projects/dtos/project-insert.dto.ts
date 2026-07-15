import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { ProjectImageInsertDto } from "../../project-images/dtos/project-image-insert.dto";
import { ProjectTechnologyInsertDto } from "../../project-techologies/dtos/project-technology-insert.dto";

export class ProjectInsertDto {
    @ApiProperty({ example: "My Portfolio Website" })
    @IsString()
    @IsNotEmpty()
    title: string;

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

    @ApiProperty({ type: [ProjectImageInsertDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProjectImageInsertDto)
    images: ProjectImageInsertDto[];

    @ApiProperty({ type: [ProjectTechnologyInsertDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProjectTechnologyInsertDto)
    technologies: ProjectTechnologyInsertDto[];
}
