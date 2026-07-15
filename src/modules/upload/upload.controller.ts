import { Controller, Post, UploadedFile, UseInterceptors, BadRequestException } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname, join } from "path";
import { randomUUID } from "crypto";
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Upload")
@Controller("upload")
export class UploadController {
    @Post()
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
    @ApiOperation({ summary: "Upload a generic image file" })
    @ApiConsumes("multipart/form-data")
    @ApiBody({
        schema: {
            type: "object",
            properties: {
                file: { type: "string", format: "binary" },
            },
            required: ["file"],
        },
    })
    @ApiResponse({ status: 201, description: "Image uploaded successfully, returns the URL" })
    @ApiResponse({ status: 400, description: "No file provided or invalid file type" })
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        if (!file) {
            throw new BadRequestException("No file provided");
        }
        return { url: `/uploads/projects/${file.filename}` };
    }
}
