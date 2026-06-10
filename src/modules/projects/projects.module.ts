import { Module } from "@nestjs/common";
import { Project } from "./entities/project.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([Project])],
    exports: [TypeOrmModule],
})
export class ProjectsModule {}