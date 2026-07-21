import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Service } from "./entities/service.entity";
import { Repository } from "typeorm/browser/repository/Repository.js";
import { ServiceInsertDto } from "./dtos/service-insert.dto";
import { ServiceUpdateDto } from "./dtos/service-update.dto";
import { ServiceType } from "./entities/service-type.enum";
import { ServicePlansService } from "../service-plans/service-plans.service";

@Injectable()
export class ServicesService {
    constructor(
        @InjectRepository(Service)
        private serviceRepository: Repository<Service>,
        private servicePlansService: ServicePlansService,
    ) {}

    findAll(): Promise<Service[]> {
        return this.serviceRepository.find({ relations: { plans: true } });
    }

    findById(id: number): Promise<Service | null> {
        return this.serviceRepository.findOne({ where: { id }, relations: { plans: true } });
    }

    async create(dto: ServiceInsertDto): Promise<Service> {
        const service = new Service();
        service.name = dto.name;
        service.description = dto.description;
        service.type = dto.type ?? ServiceType.OTHER;
        service.link = dto.link;
        service.logoUrl = dto.logoUrl;
        service.isActive = dto.isActive ?? true;

        const savedService = await this.serviceRepository.save(service);

        (dto.plans ?? []).forEach(async (planDto) => {
            await this.servicePlansService.create(planDto, savedService.id);
        });

        return savedService;
    }

    async update(id: number, dto: ServiceUpdateDto): Promise<Service> {
        const service = await this.serviceRepository.findOne({ where: { id } });
        if (!service) {
            throw new NotFoundException(`Service with id ${id} not found`);
        }

        if (dto.name !== undefined) service.name = dto.name;
        if (dto.description !== undefined) service.description = dto.description;
        if (dto.type !== undefined) service.type = dto.type;
        if (dto.link !== undefined) service.link = dto.link;
        if (dto.logoUrl !== undefined) service.logoUrl = dto.logoUrl;
        if (dto.isActive !== undefined) service.isActive = dto.isActive;

        return await this.serviceRepository.save(service);
    }

    async delete(id: number): Promise<void> {
        const service = await this.serviceRepository.findOne({ where: { id }, relations: { plans: true } });
        if (!service) {
            throw new NotFoundException(`Service with id ${id} not found`);
        }

        await this.serviceRepository.remove(service);
    }
}
