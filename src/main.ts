import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.enableCors({
    origin: 'bejewelled-crisp-10e97b.netlify.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const port = process.env.PORT || 3001;

  await app.listen(port, '0.0.0.0');
  console.log(`Server is running on port: ${port}`);
  console.log(process.env.DATABASE_URL);
}
bootstrap();
