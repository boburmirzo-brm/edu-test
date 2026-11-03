# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project state

A freshly scaffolded NestJS 11 app (`nest new` starter) on Express. It has only the default `AppModule` / `AppController` / `AppService`, with no database, config module, or env handling yet. The HTTP port is `process.env.PORT`, defaulting to 3000 (`src/main.ts`).

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
