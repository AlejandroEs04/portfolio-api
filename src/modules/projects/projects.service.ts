import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Project } from "./entities/project.entity";
import { Repository } from "typeorm/browser/repository/Repository.js";
import { ProjectInsertDto } from "./dtos/project-insert.dto";
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
}