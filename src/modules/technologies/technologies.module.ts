import { Module } from "@nestjs/common";
import { Technology } from "./entities/technology.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TechnologiesController } from "./technologies.controller";
import { TechnologiesService } from "./technologies.service";

@Module({
    imports: [TypeOrmModule.forFeature([Technology])],
    exports: [TypeOrmModule],
})
export class TechnologiesModule {}