import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProjectImage } from "./entities/project-image.entity";
import { Repository } from "typeorm/browser/repository/Repository.js";
import { ProjectImageInsertDto } from "./dtos/project-image-insert.dto";

@Injectable()
export class ProjectImagesService {
    constructor(
        @InjectRepository(ProjectImage)
        private projectImageRepository: Repository<ProjectImage>
    ) {}

    async create(dto: ProjectImageInsertDto, projectId: number): Promise<ProjectImage> {
        const projectImage = new ProjectImage();
        projectImage.url = dto.url;
        projectImage.projectId = projectId;
        projectImage.isMain = dto.isMain ?? false;
        return await this.projectImageRepository.save(projectImage);
    }
}