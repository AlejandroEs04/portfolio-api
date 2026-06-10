import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "../../projects/entities/project.entity";

@Entity()
export class ProjectImage {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    url!: string;

    @Column()
    projectId!: number;

    @Column({ default: false })
    isMain!: boolean;

    @ManyToOne(() => Project, (project) => project.images)
    project!: Project;
}