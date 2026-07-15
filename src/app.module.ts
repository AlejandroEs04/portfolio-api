import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Technology } from './modules/technologies/entities/technology.entity';
import { Project } from './modules/projects/entities/project.entity';
import { ProjectImage } from './modules/project-images/entities/project-image.entity';
import { ProjectTechnology } from './modules/project-techologies/entities/project-technology.entity';
import { DataSource } from 'typeorm';
import { TechnologiesHttpModule } from './modules/technologies/technologies-http.module';
import { ProjectTechnologiesHttpModule } from './modules/project-techologies/project-technologies-http.module';
import { ProjectImagesHttpModule } from './modules/project-images/project-images-http.module';
import { ProjectsHttpModule } from './modules/projects/projects-http.module';
import { UploadModule } from './modules/upload/upload.module';
import { ContactModule } from './modules/contact/contact.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        console.log({
          host: config.get('DB_HOST'),
          port: config.get('DB_PORT'),
          user: config.get('DB_USER'),
          pass: config.get('DB_PASS'),
          database: config.get('DB_DATABASE'),
        });

        console.log('cwd:', process.cwd());
        console.log('__dirname:', __dirname);

        return {
          type: 'postgres',
          host: config.get<string>('DB_HOST'),
          port: config.get<number>('DB_PORT'),
          username: config.get<string>('DB_USER'),
          password: config.get<string>('DB_PASS'),
          database: config.get<string>('DB_DATABASE'),
          entities: [Technology, Project, ProjectImage, ProjectTechnology],
          synchronize: true,
        }
      },
    }),
    TechnologiesHttpModule,
    ProjectTechnologiesHttpModule,
    ProjectImagesHttpModule,
    ProjectsHttpModule,
    UploadModule,
    ContactModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
