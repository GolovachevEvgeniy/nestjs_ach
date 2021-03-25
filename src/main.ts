import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false });

  await app.listen(process.env.APP_PORT);

  console.log(`\n`);
  console.log(`ACH Application is running on: ${await app.getUrl()}`);
}

bootstrap();


// TODO Validation date
// TODO interfaces
// TODO filter by date