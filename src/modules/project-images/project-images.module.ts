import { Module } from "@nestjs/common";
import { ProjectImage } from "./entities/project-image.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([ProjectImage])],
    exports: [TypeOrmModule],
})
export class ProjectImagesModule {}