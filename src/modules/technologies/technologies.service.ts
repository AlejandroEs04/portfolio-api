import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Technology } from "./entities/technology.entity";
import { Repository } from "typeorm/browser/repository/Repository.js";

@Injectable()
export class TechnologiesService {
    constructor(
        @InjectRepository(Technology)
        private technologyRepository: Repository<Technology>
    ) {}

    findAll(): Promise<Technology[]> {
        return this.technologyRepository.find();
    }

    async create(name: string): Promise<Technology> {
        const technology = new Technology();
        technology.name = name;
        return await this.technologyRepository.save(technology);
    }
}