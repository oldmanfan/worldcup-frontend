#!/usr/bin/env node

function bootstrap() {
  return import('../dist/cli.js')
}

bootstrap();
