import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ServicesService } from "./services.service";
import { ServicePlansService } from "../service-plans/service-plans.service";
import { ServiceInsertDto } from "./dtos/service-insert.dto";
import { ServiceUpdateDto } from "./dtos/service-update.dto";
import { ServicePlanInsertDto } from "../service-plans/dtos/service-plan-insert.dto";
import { ServicePlanUpdateDto } from "../service-plans/dtos/service-plan-update.dto";

@ApiTags("Services")
@Controller("services")
export class ServicesController {
    constructor(
        private service: ServicesService,
        private servicePlansService: ServicePlansService,
    ) {}

    @Get()
    @ApiOperation({ summary: "Get all services" })
    @ApiResponse({ status: 200, description: "List of all services" })
    async findAll() {
        return await this.service.findAll();
    }

    @Get(":id")
    @ApiOperation({ summary: "Get a service by ID" })
    @ApiParam({ name: "id", description: "Service ID", example: 1 })
    @ApiResponse({ status: 200, description: "Service found" })
    @ApiResponse({ status: 404, description: "Service not found" })
    async findById(@Param("id", ParseIntPipe) id: number) {
        return await this.service.findById(id);
    }

    @Post()
    @ApiOperation({ summary: "Create a new service" })
    @ApiResponse({ status: 201, description: "Service created successfully" })
    async create(@Body() dto: ServiceInsertDto) {
        return await this.service.create(dto);
    }

    @Patch(":id")
    @ApiOperation({ summary: "Update a service" })
    @ApiParam({ name: "id", description: "Service ID", example: 1 })
    @ApiResponse({ status: 200, description: "Service updated successfully" })
    @ApiResponse({ status: 404, description: "Service not found" })
    async update(@Param("id", ParseIntPipe) id: number, @Body() dto: ServiceUpdateDto) {
        return await this.service.update(id, dto);
    }

    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: "Delete a service" })
    @ApiParam({ name: "id", description: "Service ID", example: 1 })
    @ApiResponse({ status: 204, description: "Service deleted successfully" })
    @ApiResponse({ status: 404, description: "Service not found" })
    async delete(@Param("id", ParseIntPipe) id: number) {
        await this.service.delete(id);
    }

    @Post(":id/plans")
    @ApiOperation({ summary: "Add a plan to a service" })
    @ApiParam({ name: "id", description: "Service ID", example: 1 })
    @ApiResponse({ status: 201, description: "Plan created successfully" })
    @ApiResponse({ status: 404, description: "Service not found" })
    async createPlan(@Param("id", ParseIntPipe) id: number, @Body() dto: ServicePlanInsertDto) {
        return await this.servicePlansService.create(dto, id);
    }

    @Patch(":id/plans/:planId")
    @ApiOperation({ summary: "Update a service plan" })
    @ApiParam({ name: "id", description: "Service ID", example: 1 })
    @ApiParam({ name: "planId", description: "Plan ID", example: 1 })
    @ApiResponse({ status: 200, description: "Plan updated successfully" })
    @ApiResponse({ status: 404, description: "Plan not found" })
    async updatePlan(
        @Param("id", ParseIntPipe) id: number,
        @Param("planId", ParseIntPipe) planId: number,
        @Body() dto: ServicePlanUpdateDto,
    ) {
        return await this.servicePlansService.update(id, planId, dto);
    }

    @Delete(":id/plans/:planId")
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: "Delete a plan from a service" })
    @ApiParam({ name: "id", description: "Service ID", example: 1 })
    @ApiParam({ name: "planId", description: "Plan ID", example: 1 })
    @ApiResponse({ status: 204, description: "Plan deleted successfully" })
    @ApiResponse({ status: 404, description: "Plan not found" })
    async deletePlan(
        @Param("id", ParseIntPipe) id: number,
        @Param("planId", ParseIntPipe) planId: number,
    ) {
        await this.servicePlansService.delete(id, planId);
    }
}
