import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProjectTechnology } from "../../project-techologies/entities/project-technology.entity";

@Entity()
export class Technology {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @OneToMany(() => ProjectTechnology, (pt) => pt.technology, { cascade: true })
    projectTechnologies!: ProjectTechnology[];
}