import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { BillingPeriod } from "../entities/billing-period.enum";

export class ServicePlanInsertDto {
    @ApiProperty({ example: "Pro" })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiPropertyOptional({ example: "For growing teams that need more requests" })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ example: 9.99 })
    @IsNumber()
    @Min(0)
    price: number;

    @ApiPropertyOptional({ example: "USD", default: "USD" })
    @IsString()
    @IsOptional()
    currency?: string;

    @ApiPropertyOptional({ enum: BillingPeriod, example: BillingPeriod.MONTHLY, default: BillingPeriod.MONTHLY })
    @IsEnum(BillingPeriod)
    @IsOptional()
    billingPeriod?: BillingPeriod;

    @ApiPropertyOptional({ type: [String], example: ["Up to 10,000 requests/mo", "Email support"] })
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    features?: string[];

    @ApiPropertyOptional({ example: false, default: false })
    @IsBoolean()
    @IsOptional()
    isFeatured?: boolean;
}
