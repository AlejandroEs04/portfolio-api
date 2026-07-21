import { OmitType, PartialType } from "@nestjs/swagger";
import { ServiceInsertDto } from "./service-insert.dto";

export class ServiceUpdateDto extends PartialType(OmitType(ServiceInsertDto, ["plans"] as const)) {}
