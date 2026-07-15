import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProjectTechnology } from "../../project-techologies/entities/project-technology.entity";

@Entity()
export class Technology {
    @ApiProperty({ example: 1 })
    @PrimaryGeneratedColumn()
    id!: number;

    @ApiProperty({ example: "TypeScript" })
    @Column()
    name!: string;

    @ApiProperty({ type: () => [ProjectTechnology] })
    @OneToMany(() => ProjectTechnology, (pt) => pt.technology, { cascade: true })
    projectTechnologies!: ProjectTechnology[];
}
