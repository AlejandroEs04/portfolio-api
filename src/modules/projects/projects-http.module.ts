import { Module } from "@nestjs/common";
import { ProjectsModule } from "./projects.module";
import { ProjectTechnologiesHttpModule } from "../project-techologies/project-technologies-http.module";
import { ProjectImagesHttpModule } from "../project-images/project-images-http.module";
import { ProjectsController } from "./projects.controller";
import { ProjectsService } from "./projects.service";

@Module({
    imports: [ProjectsModule, ProjectImagesHttpModule, ProjectTechnologiesHttpModule],
    controllers: [ProjectsController],
    providers: [ProjectsService],
    exports: [ProjectsService],
})
export class ProjectsHttpModule {}