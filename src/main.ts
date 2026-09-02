import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { writeFile } from 'fs/promises';
import { AuthGuard } from './auth/guards/auth.guard';
import { UserService } from './user/user.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);

  const appUrl = await app.getUrl();

}
bootstrap();
