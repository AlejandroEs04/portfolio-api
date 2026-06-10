import { Module } from "@nestjs/common";
import { TechnologiesController } from "./technologies.controller";
import { TechnologiesService } from "./technologies.service";
import { TechnologiesModule } from "./technologies.module";

@Module({
    imports: [TechnologiesModule],
    providers: [TechnologiesService],
    controllers: [TechnologiesController],
})
export class TechnologiesHttpModule {}