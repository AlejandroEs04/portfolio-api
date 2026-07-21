import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Project } from "./entities/project.entity";
import { Repository } from "typeorm/browser/repository/Repository.js";
import { ProjectInsertDto } from "./dtos/project-insert.dto";
import { ProjectUpdateDto } from "./dtos/project-update.dto";
import { ProjectImage } from "../project-images/entities/project-image.entity";
import { ProjectTechnology } from "../project-techologies/entities/project-technology.entity";
import { ProjectImagesService } from "../project-images/project-images.service";
import { ProjectTechnologiesService } from "../project-techologies/project-technologies.service";

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Project)
        private projectRepository: Repository<Project>,
        private projectImageService: ProjectImagesService,
        private projectTechnologyService: ProjectTechnologiesService
    ) {}

    findAll(): Promise<Project[]> {
        const projects = this.projectRepository.find({ relations: { images: true, projectTechnologies: { technology: true } } });
        return projects;
    }

    findById(id: number) : Promise<Project | null> {
        const project = this.projectRepository.findOne({ where: { id }, relations: { images: true, projectTechnologies: { technology: true } } })
        return project;
    }

    async create(dto: ProjectInsertDto): Promise<Project> {
        const project = new Project();
        project.title = dto.title;
        project.description = dto.description;
        project.customerName = dto.customerName;
        project.githubLink = dto.githubLink;

        const savedProject = await this.projectRepository.save(project);

        dto.images.forEach(async (imageDto) => {
            await this.projectImageService.create(imageDto, savedProject.id);
        });

        dto.technologies.forEach(async (technologyDto) => {
            await this.projectTechnologyService.create(technologyDto, savedProject.id);
        });

        return savedProject;
    }

    async update(id: number, dto: ProjectUpdateDto): Promise<Project> {
        const project = await this.projectRepository.findOne({ where: { id } });
        if (!project) {
            throw new NotFoundException(`Project with id ${id} not found`);
        }

        if (dto.title !== undefined) project.title = dto.title;
        if (dto.description !== undefined) project.description = dto.description;
        if (dto.customerName !== undefined) project.customerName = dto.customerName;
        if (dto.githubLink !== undefined) project.githubLink = dto.githubLink;

        return await this.projectRepository.save(project);
    }

    async delete(id: number): Promise<void> {
        const project = await this.projectRepository.findOne({
            where: { id },
            relations: { images: true, projectTechnologies: true },
        });
        if (!project) {
            throw new NotFoundException(`Project with id ${id} not found`);
        }

        await Promise.all(project.images.map((image) => this.projectImageService.deleteFile(image.url)));

        await this.projectRepository.remove(project);
    }
}