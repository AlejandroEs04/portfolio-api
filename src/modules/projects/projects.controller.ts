import { Body, Controller, Get, Post, Patch, Delete, Param, ParseIntPipe, UploadedFile, UseInterceptors, BadRequestException, HttpCode, HttpStatus } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname, join } from "path";
import { randomUUID } from "crypto";
import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ProjectsService } from "./projects.service";
import { ProjectImagesService } from "../project-images/project-images.service";
import { ProjectInsertDto } from "./dtos/project-insert.dto";
import { ProjectUpdateDto } from "./dtos/project-update.dto";

@ApiTags("Projects")
@Controller("projects")
export class ProjectsController {
    constructor(
        private service: ProjectsService,
        private projectImageService: ProjectImagesService,
    ) {}

    @Get()
    @ApiOperation({ summary: "Get all projects" })
    @ApiResponse({ status: 200, description: "List of all projects" })
    async findAll() {
        return await this.service.findAll();
    }

    @Get(":id")
    @ApiOperation({ summary: "Get a project by ID" })
    @ApiParam({ name: "id", description: "Project ID", example: 1 })
    @ApiResponse({ status: 200, description: "Project found" })
    @ApiResponse({ status: 404, description: "Project not found" })
    async findById(@Param("id", ParseIntPipe) id: number) {
        return await this.service.findById(id);
    }

    @Post()
    @ApiOperation({ summary: "Create a new project" })
    @ApiResponse({ status: 201, description: "Project created successfully" })
    async create(@Body() dto: ProjectInsertDto) {
        return await this.service.create(dto);
    }

    @Patch(":id")
    @ApiOperation({ summary: "Update a project" })
    @ApiParam({ name: "id", description: "Project ID", example: 1 })
    @ApiResponse({ status: 200, description: "Project updated successfully" })
    @ApiResponse({ status: 404, description: "Project not found" })
    async update(@Param("id", ParseIntPipe) id: number, @Body() dto: ProjectUpdateDto) {
        return await this.service.update(id, dto);
    }

    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: "Delete a project" })
    @ApiParam({ name: "id", description: "Project ID", example: 1 })
    @ApiResponse({ status: 204, description: "Project deleted successfully" })
    @ApiResponse({ status: 404, description: "Project not found" })
    async delete(@Param("id", ParseIntPipe) id: number) {
        await this.service.delete(id);
    }

    @Delete(":id/images/:imageId")
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: "Delete an image from a project" })
    @ApiParam({ name: "id", description: "Project ID", example: 1 })
    @ApiParam({ name: "imageId", description: "Image ID", example: 1 })
    @ApiResponse({ status: 204, description: "Image deleted successfully" })
    @ApiResponse({ status: 404, description: "Image not found" })
    async deleteImage(
        @Param("id", ParseIntPipe) id: number,
        @Param("imageId", ParseIntPipe) imageId: number,
    ) {
        await this.projectImageService.delete(id, imageId);
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
    @ApiOperation({ summary: "Upload an image for a project" })
    @ApiConsumes("multipart/form-data")
    @ApiParam({ name: "id", description: "Project ID", example: 1 })
    @ApiBody({
        schema: {
            type: "object",
            properties: {
                file: { type: "string", format: "binary" },
                isMain: { type: "string", example: "true", description: "Whether this is the main project image" },
            },
            required: ["file"],
        },
    })
    @ApiResponse({ status: 201, description: "Image uploaded successfully" })
    @ApiResponse({ status: 400, description: "No file provided or invalid file type" })
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
