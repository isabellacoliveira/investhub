import express from 'express';
import { createNodeRequestHandler } from '@angular/ssr/node';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import bootstrap from './src/main.server';

export function app(): express.Express {
  const server = express();

  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');

  server.use(
    express.static(browserDistFolder, {
      maxAge: '1y',
      index: false,
    }),
  );

  server.use(
    createNodeRequestHandler(async () => {
      await bootstrap();
    }),
  );

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  const server = app();

  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
