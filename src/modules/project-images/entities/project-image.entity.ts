import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "../../projects/entities/project.entity";

@Entity()
export class ProjectImage {
    @ApiProperty({ example: 1 })
    @PrimaryGeneratedColumn()
    id!: number;

    @ApiProperty({ example: "/uploads/projects/abc123.jpg" })
    @Column()
    url!: string;

    @ApiProperty({ example: 1 })
    @Column()
    projectId!: number;

    @ApiProperty({ example: false })
    @Column({ default: false })
    isMain!: boolean;

    @ManyToOne(() => Project, (project) => project.images)
    project!: Project;
}
