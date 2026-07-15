import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class ProjectImageInsertDto {
    @ApiProperty({ example: "/uploads/projects/abc123.jpg" })
    @IsString()
    @IsNotEmpty()
    url: string;

    @ApiPropertyOptional({ example: false, default: false })
    @IsBoolean()
    @IsOptional()
    isMain?: boolean;
}
