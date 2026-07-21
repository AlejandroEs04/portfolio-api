import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProjectImage } from "./entities/project-image.entity";
import { Repository } from "typeorm/browser/repository/Repository.js";
import { ProjectImageInsertDto } from "./dtos/project-image-insert.dto";
import { join } from "path";
import { existsSync } from "fs";
import { unlink } from "fs/promises";

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

    async delete(projectId: number, imageId: number): Promise<void> {
        const image = await this.projectImageRepository.findOne({ where: { id: imageId, projectId } });
        if (!image) {
            throw new NotFoundException(`Image with id ${imageId} not found for project ${projectId}`);
        }

        await this.deleteFile(image.url);
        await this.projectImageRepository.remove(image);
    }

    async deleteFile(url: string): Promise<void> {
        const filename = url.split("/").pop();
        if (!filename) return;

        const filePath = join(process.cwd(), "uploads", "projects", filename);
        if (existsSync(filePath)) {
            await unlink(filePath);
        }
    }
}
