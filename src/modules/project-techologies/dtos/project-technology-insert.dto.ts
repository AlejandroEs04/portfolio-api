import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class ProjectTechnologyInsertDto {
    @ApiProperty({ example: 1 })
    @IsNumber()
    @IsNotEmpty()
    technologyId: number;
}
