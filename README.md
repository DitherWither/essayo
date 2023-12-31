# Essayo

This repo uses pnpm instead of npm, install it using [this guide](https://pnpm.io/installation)

Being developed by [DitherWither](https://github.com/DitherWither/) and [Arthavruksha](https://github.com/Arthavruksha/)

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

Everything that gets deployed directly goes in `apps/`.

Everything that gets imported by other packages goes in `packages/`

-   `app/docs`: a [Next.js](https://nextjs.org/) app, currently not used, will contain docs later
-   `apps/web`: another [Next.js](https://nextjs.org/) app
-   `packages/eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
-   `packages/tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

-   [TypeScript](https://www.typescriptlang.org/) for static type checking
-   [ESLint](https://eslint.org/) for code linting
-   [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm dev
```
