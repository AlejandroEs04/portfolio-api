import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Service } from "../../services/entities/service.entity";
import { BillingPeriod } from "./billing-period.enum";

@Entity()
export class ServicePlan {
    @ApiProperty({ example: 1 })
    @PrimaryGeneratedColumn()
    id!: number;

    @ApiProperty({ example: 1 })
    @Column()
    serviceId!: number;

    @ApiProperty({ example: "Pro" })
    @Column()
    name!: string;

    @ApiPropertyOptional({ example: "For growing teams that need more requests" })
    @Column({ type: "text", nullable: true })
    description?: string;

    @ApiProperty({ example: 9.99 })
    @Column({ type: "float" })
    price!: number;

    @ApiProperty({ example: "USD", default: "USD" })
    @Column({ default: "USD" })
    currency!: string;

    @ApiProperty({ enum: BillingPeriod, example: BillingPeriod.MONTHLY })
    @Column({ type: "enum", enum: BillingPeriod, default: BillingPeriod.MONTHLY })
    billingPeriod!: BillingPeriod;

    @ApiPropertyOptional({ type: [String], example: ["Up to 10,000 requests/mo", "Email support"] })
    @Column({ type: "simple-array", nullable: true })
    features?: string[];

    @ApiProperty({ example: false, default: false })
    @Column({ default: false })
    isFeatured!: boolean;

    @ManyToOne(() => Service, (service) => service.plans)
    service!: Service;
}
