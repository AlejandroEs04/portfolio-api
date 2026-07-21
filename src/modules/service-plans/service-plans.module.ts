import { Module } from "@nestjs/common";
import { ServicePlan } from "./entities/service-plan.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([ServicePlan])],
    exports: [TypeOrmModule],
})
export class ServicePlansModule {}
