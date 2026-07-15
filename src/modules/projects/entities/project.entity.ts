import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProjectImage } from "../../project-images/entities/project-image.entity";
import { ProjectTechnology } from "../../project-techologies/entities/project-technology.entity";

@Entity()
export class Project {
    @ApiProperty({ example: 1 })
    @PrimaryGeneratedColumn()
    id!: number;

    @ApiProperty({ example: "My Portfolio Website" })
    @Column()
    title!: string;

    @ApiPropertyOptional({ example: "A full-stack portfolio application" })
    @Column({ type: "text", nullable: true })
    description?: string;

    @ApiPropertyOptional({ example: "https://github.com/user/project" })
    @Column({ nullable: true })
    githubLink?: string;

    @ApiPropertyOptional({ example: "John Doe" })
    @Column({ nullable: true })
    customerName?: string;

    @ApiProperty({ type: () => [ProjectImage] })
    @OneToMany(() => ProjectImage, (image) => image.project, { cascade: true })
    images!: ProjectImage[];

    @ApiProperty({ type: () => [ProjectTechnology] })
    @OneToMany(() => ProjectTechnology, (pt) => pt.project, { cascade: true })
    projectTechnologies!: ProjectTechnology[];
}
