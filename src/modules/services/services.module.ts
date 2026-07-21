import { Module } from "@nestjs/common";
import { Service } from "./entities/service.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([Service])],
    exports: [TypeOrmModule],
})
export class ServicesModule {}
