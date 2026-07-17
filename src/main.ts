import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import { existsSync, mkdirSync } from "fs";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    const uploadDir = join(process.cwd(), "uploads", "projects");
    if (!existsSync(uploadDir)) {
        mkdirSync(uploadDir, { recursive: true });
    }

    const frontendUrl = process.env.FRONTEND_URL ?? "http://localhost:4200";

    app.enableCors({
        origin: frontendUrl.split(",").map((u) => u.trim()),
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        credentials: true,
    });

    app.useStaticAssets(join(process.cwd(), "uploads"), {
        prefix: "/uploads",
    });

    app.useGlobalPipes(
        new ValidationPipe({ whitelist: true, transform: true }),
    );

    const config = new DocumentBuilder()
        .setTitle("Portfolio API")
        .setDescription("API for managing portfolio projects, technologies, and images")
        .setVersion("1.0")
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, document);

    await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
