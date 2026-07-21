import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ServicePlan } from "../../service-plans/entities/service-plan.entity";
import { ServiceType } from "./service-type.enum";

@Entity()
export class Service {
    @ApiProperty({ example: 1 })
    @PrimaryGeneratedColumn()
    id!: number;

    @ApiProperty({ example: "Venme" })
    @Column()
    name!: string;

    @ApiPropertyOptional({ example: "A SaaS platform to split and track shared expenses" })
    @Column({ type: "text", nullable: true })
    description?: string;

    @ApiProperty({ enum: ServiceType, example: ServiceType.SAAS })
    @Column({ type: "enum", enum: ServiceType, default: ServiceType.OTHER })
    type!: ServiceType;

    @ApiPropertyOptional({ example: "https://venme.app" })
    @Column({ nullable: true })
    link?: string;

    @ApiPropertyOptional({ example: "/uploads/services/venme-logo.png" })
    @Column({ nullable: true })
    logoUrl?: string;

    @ApiProperty({ example: true, default: true })
    @Column({ default: true })
    isActive!: boolean;

    @ApiProperty({ type: () => [ServicePlan] })
    @OneToMany(() => ServicePlan, (plan) => plan.service, { cascade: true })
    plans!: ServicePlan[];
}
