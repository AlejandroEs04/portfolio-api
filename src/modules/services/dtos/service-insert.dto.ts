import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { ServicePlanInsertDto } from "../../service-plans/dtos/service-plan-insert.dto";
import { ServiceType } from "../entities/service-type.enum";

export class ServiceInsertDto {
    @ApiProperty({ example: "Venme" })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiPropertyOptional({ example: "A SaaS platform to split and track shared expenses" })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiPropertyOptional({ enum: ServiceType, example: ServiceType.SAAS, default: ServiceType.OTHER })
    @IsEnum(ServiceType)
    @IsOptional()
    type?: ServiceType;

    @ApiPropertyOptional({ example: "https://venme.app" })
    @IsString()
    @IsOptional()
    link?: string;

    @ApiPropertyOptional({ example: "/uploads/services/venme-logo.png" })
    @IsString()
    @IsOptional()
    logoUrl?: string;

    @ApiPropertyOptional({ example: true, default: true })
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;

    @ApiPropertyOptional({ type: [ServicePlanInsertDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ServicePlanInsertDto)
    @IsOptional()
    plans?: ServicePlanInsertDto[];
}
