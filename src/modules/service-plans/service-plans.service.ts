import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ServicePlan } from "./entities/service-plan.entity";
import { Repository } from "typeorm/browser/repository/Repository.js";
import { ServicePlanInsertDto } from "./dtos/service-plan-insert.dto";
import { ServicePlanUpdateDto } from "./dtos/service-plan-update.dto";

@Injectable()
export class ServicePlansService {
    constructor(
        @InjectRepository(ServicePlan)
        private servicePlanRepository: Repository<ServicePlan>
    ) {}

    async create(dto: ServicePlanInsertDto, serviceId: number): Promise<ServicePlan> {
        const servicePlan = new ServicePlan();
        servicePlan.serviceId = serviceId;
        servicePlan.name = dto.name;
        servicePlan.description = dto.description;
        servicePlan.price = dto.price;
        servicePlan.currency = dto.currency ?? "USD";
        servicePlan.billingPeriod = dto.billingPeriod ?? servicePlan.billingPeriod;
        servicePlan.features = dto.features;
        servicePlan.isFeatured = dto.isFeatured ?? false;
        return await this.servicePlanRepository.save(servicePlan);
    }

    async update(serviceId: number, planId: number, dto: ServicePlanUpdateDto): Promise<ServicePlan> {
        const plan = await this.servicePlanRepository.findOne({ where: { id: planId, serviceId } });
        if (!plan) {
            throw new NotFoundException(`Plan with id ${planId} not found for service ${serviceId}`);
        }

        if (dto.name !== undefined) plan.name = dto.name;
        if (dto.description !== undefined) plan.description = dto.description;
        if (dto.price !== undefined) plan.price = dto.price;
        if (dto.currency !== undefined) plan.currency = dto.currency;
        if (dto.billingPeriod !== undefined) plan.billingPeriod = dto.billingPeriod;
        if (dto.features !== undefined) plan.features = dto.features;
        if (dto.isFeatured !== undefined) plan.isFeatured = dto.isFeatured;

        return await this.servicePlanRepository.save(plan);
    }

    async delete(serviceId: number, planId: number): Promise<void> {
        const plan = await this.servicePlanRepository.findOne({ where: { id: planId, serviceId } });
        if (!plan) {
            throw new NotFoundException(`Plan with id ${planId} not found for service ${serviceId}`);
        }

        await this.servicePlanRepository.remove(plan);
    }
}
