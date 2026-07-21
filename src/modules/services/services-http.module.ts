import { Module } from "@nestjs/common";
import { ServicesModule } from "./services.module";
import { ServicePlansHttpModule } from "../service-plans/service-plans-http.module";
import { ServicesController } from "./services.controller";
import { ServicesService } from "./services.service";

@Module({
    imports: [ServicesModule, ServicePlansHttpModule],
    controllers: [ServicesController],
    providers: [ServicesService],
    exports: [ServicesService],
})
export class ServicesHttpModule {}
