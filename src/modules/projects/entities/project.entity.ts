import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProjectImage } from "../../project-images/entities/project-image.entity";
import { ProjectTechnology } from "../../project-techologies/entities/project-technology.entity";

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column({ type: "text", nullable: true })
    description?: string;

    @Column({ nullable: true })
    githubLink?: string;

    @Column({ nullable: true })
    customerName?: string;

    @OneToMany(() => ProjectImage, (image) => image.project, { cascade: true })
    images!: ProjectImage[];

    @OneToMany(() => ProjectTechnology, (pt) => pt.project, { cascade: true })
    projectTechnologies!: ProjectTechnology[];
}