import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { TechnologiesService } from "./technologies.service";

@ApiTags("Technologies")
@Controller("technologies")
export class TechnologiesController {
    constructor(private service: TechnologiesService) {}

    @Get()
    @ApiOperation({ summary: "Get all technologies" })
    @ApiResponse({ status: 200, description: "List of all technologies" })
    async findAll() {
        return await this.service.findAll();
    }

    @Post()
    @ApiOperation({ summary: "Create a new technology" })
    @ApiBody({
        schema: {
            type: "object",
            properties: {
                name: { type: "string", example: "TypeScript", description: "Technology name" },
            },
            required: ["name"],
        },
    })
    @ApiResponse({ status: 201, description: "Technology created successfully" })
    async create(@Body("name") name: string) {
        return await this.service.create(name);
    }
}
