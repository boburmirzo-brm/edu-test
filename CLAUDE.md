# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project state

A NestJS 11 app on Express with TypeORM + PostgreSQL and a `users` CRUD module (`src/users`). Config comes from `.env` via `@nestjs/config` (see `.env.example` for `DB_*` and `PORT`). TypeORM uses `autoLoadEntities` and `synchronize` (on unless `NODE_ENV=production`), so there are no migrations yet. Swagger UI is at `/docs` (JSON at `/docs-json`). A global `ValidationPipe` (`whitelist`, `forbidNonWhitelisted`, `transform`) validates DTOs with class-validator.

Keep Nest ecosystem packages on the Nest 11 line (`@nestjs/config@4`, `@nestjs/typeorm@11`, `@nestjs/swagger@11`). Their v12 releases need `@nestjs/common@12` or are ESM-only, and Jest can't load ESM-only packages. E2E tests boot the full `AppModule`, so they need a running Postgres.

## Commands

```bash
npm install
npm run start:dev        # watch mode
npm run start:debug      # watch + inspector
npm run build            # nest build -> dist/ (output dir is wiped first)
npm run start:prod       # node dist/main

npm run lint             # eslint with --fix (it rewrites files)
npm run format           # prettier on src/ and test/

npm test                                   # unit tests (*.spec.ts under src/)
npx jest src/app.controller.spec.ts        # single unit test file
npx jest -t "should return"                # tests whose name matches a pattern
npm run test:e2e                           # e2e (test/*.e2e-spec.ts, own config test/jest-e2e.json)
npx jest --config ./test/jest-e2e.json test/app.e2e-spec.ts   # single e2e file
npm run test:cov
```

## Architecture and conventions

- Standard Nest module tree: `src/main.ts` bootstraps `AppModule`. New features should be their own modules (`nest g resource <name>` or `nest g module|controller|service`) and get imported into `AppModule`.
- There are two Jest setups. Unit tests use the `jest` block in `package.json` (`rootDir: src`, `*.spec.ts`, colocated with source). E2E tests use `test/jest-e2e.json` (`*.e2e-spec.ts`); they boot the full `AppModule` and send requests with `supertest`.
- TypeScript compiles to `module: nodenext` with `isolatedModules`. `strictNullChecks` is on, but `noImplicitAny` is off. Decorator metadata is enabled, so Nest DI relies on constructor parameter types.
- ESLint uses typescript-eslint `recommendedTypeChecked` (type-aware) plus Prettier, which is configured with single quotes and trailing commas. `no-explicit-any` is off. `no-floating-promises` and `no-unsafe-argument` are warnings only.
