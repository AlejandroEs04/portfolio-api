import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProjectTechnology } from "./entities/project-technology.entity";
import { Repository } from "typeorm/browser/repository/Repository.js";
import { ProjectTechnologyInsertDto } from "./dtos/project-technology-insert.dto";

@Injectable()
export class ProjectTechnologiesService {
    constructor(
        @InjectRepository(ProjectTechnology)
        private projectTechnologyRepository: Repository<ProjectTechnology>
    ) {}

    async create(dto: ProjectTechnologyInsertDto, projectId: number): Promise<ProjectTechnology> {
        const projectTechnology = new ProjectTechnology();
        projectTechnology.technologyId = dto.technologyId;
        projectTechnology.projectId = projectId;
        return await this.projectTechnologyRepository.save(projectTechnology);
    }
}