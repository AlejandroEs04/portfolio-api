import { Body, Controller, Get, Post } from "@nestjs/common";
import { TechnologiesService } from "./technologies.service";

@Controller('technologies')
export class TechnologiesController {
    constructor(private service: TechnologiesService) {}

    @Get()
    async findAll() {
        return await this.service.findAll();
    }

    @Post()
    async create(
        @Body('name') name: string
    ) {
        return await this.service.create(name);
    }
}