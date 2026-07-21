import { PartialType } from "@nestjs/swagger";
import { ServicePlanInsertDto } from "./service-plan-insert.dto";

export class ServicePlanUpdateDto extends PartialType(ServicePlanInsertDto) {}
