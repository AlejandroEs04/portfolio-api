import { ApiProperty } from "@nestjs/swagger";
import { Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Project } from "../../projects/entities/project.entity";
import { Technology } from "../../technologies/entities/technology.entity";

@Entity()
export class ProjectTechnology {
    @ApiProperty({ example: 1 })
    @PrimaryColumn()
    projectId!: number;

    @ApiProperty({ example: 1 })
    @PrimaryColumn()
    technologyId!: number;

    @ManyToOne(() => Project, (project) => project.projectTechnologies)
    project!: Project;

    @ManyToOne(() => Technology, (technology) => technology.projectTechnologies)
    technology!: Technology;
}
