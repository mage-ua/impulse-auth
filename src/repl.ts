import { repl } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  await repl(AppModule);
}

bootstrap().catch((error) => console.error(error));

// yarn start -- --entryFile repl
// yarn start -- --watch --entryFile repl

// await get("UserRepository").update({ role: 'admin' }, { where: { id: 1 }, returning: true, raw: true })
// await get("UserRepository").update({ role: 'regular' }, { where: { id: 1 } , returning: true, raw: true})
// await get("UserRepository").findAll({ raw: true })

// .exit
// Ctrl + C
