import { Module } from "@nestjs/common";
import { ServicePlansModule } from "./service-plans.module";
import { ServicePlansService } from "./service-plans.service";

@Module({
    imports: [ServicePlansModule],
    providers: [ServicePlansService],
    exports: [ServicePlansService],
})
export class ServicePlansHttpModule {}
