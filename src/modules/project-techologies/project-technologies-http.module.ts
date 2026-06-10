import { Module } from "@nestjs/common";
import { ProjectTechnologiesModule } from "./project-technologies.module";
import { ProjectTechnologiesService } from "./project-technologies.service";

@Module({
    imports: [ProjectTechnologiesModule],
    providers: [ProjectTechnologiesService],
    exports: [ProjectTechnologiesService],
})
export class ProjectTechnologiesHttpModule {}