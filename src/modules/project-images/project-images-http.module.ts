import { Module } from "@nestjs/common";
import { ProjectImagesService } from "./project-images.service";
import { ProjectImagesModule } from "./project-images.module";

@Module({
    imports: [ProjectImagesModule],
    providers: [ProjectImagesService],
    exports: [ProjectImagesService],
})
export class ProjectImagesHttpModule {}