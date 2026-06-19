import { Body, Controller, Get, Post, Param, ParseIntPipe, UploadedFile, UseInterceptors, BadRequestException, Request } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname, join } from "path";
import { randomUUID } from "crypto";
import { ProjectsService } from "./projects.service";
import { ProjectImagesService } from "../project-images/project-images.service";
import type { ProjectInsertDto } from "./dtos/project-insert.dto";

@Controller("projects")
export class ProjectsController {
    constructor(
        private service: ProjectsService,
        private projectImageService: ProjectImagesService,
    ) {}

    @Get()
    async findAll() {
        return await this.service.findAll();
    }

    @Get(':id')
    async findById(
        @Param("id", ParseIntPipe) id: number,
    ) {
        return await this.service.findById(id)
    }

    @Post()
    async create(
        @Body() dto: ProjectInsertDto
    ) {        
        return await this.service.create(dto);
    }

    @Post(":id/images")
    @UseInterceptors(
        FileInterceptor("file", {
            storage: diskStorage({
                destination: join(process.cwd(), "uploads", "projects"),
                filename: (_req, file, callback) => {
                    const uniqueName = randomUUID() + extname(file.originalname);
                    callback(null, uniqueName);
                },
            }),
            fileFilter: (_req, file, callback) => {
                if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
                    return callback(new BadRequestException("Only image files are allowed"), false);
                }
                callback(null, true);
            },
            limits: { fileSize: 10 * 1024 * 1024 },
        }),
    )
    async uploadImage(
        @Param("id", ParseIntPipe) id: number,
        @UploadedFile() file: Express.Multer.File,
        @Body("isMain") isMain?: string,
    ) {
        if (!file) {
            throw new BadRequestException("No file provided");
        }
        const url = `/uploads/projects/${file.filename}`;
        return await this.projectImageService.create(
            { url, isMain: isMain === "true" },
            id,
        );
    }
}