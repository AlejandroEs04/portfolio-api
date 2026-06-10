import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectTechnology } from "./entities/project-technology.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ProjectTechnology])],
    exports: [TypeOrmModule],
})
export class ProjectTechnologiesModule {}