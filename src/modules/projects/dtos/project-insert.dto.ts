import { ProjectImageInsertDto } from "../../project-images/dtos/project-image-insert.dto";
import { ProjectTechnologyInsertDto } from "../../project-techologies/dtos/project-technology-insert.dto";

export interface ProjectInsertDto {
    title: string;
    description?: string;
    githubLink?: string;
    customerName?: string;
    images: ProjectImageInsertDto[];
    technologies: ProjectTechnologyInsertDto[];
}