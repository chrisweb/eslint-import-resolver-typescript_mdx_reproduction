> [!TIP]  
> this [bug is fixed](https://github.com/import-js/eslint-import-resolver-typescript/issues/363#issuecomment-2715011354) in eslint-import-resolver-typescript [3.8.5](https://github.com/import-js/eslint-import-resolver-typescript/releases/tag/v3.8.5)  

# eslint-import-resolver-typescript bug reproduction

when eslint-import-resolver-typescript > 3.7.0 linting fails

this us due to a breaking change got introduced in 3.8.0 that prevents aliases to be resolved to a module on the local filesystem

> [!NOTE]  
> the problem only occurs when linting **MDX files** and using **aliases**  

## linting error reproduction

first make sure you followed the [development](#development) steps

then start the linting process using a custom [eslint.config.ts](eslint.config.ts):

```shell
npm run lint
```

you will get the following error on line 1 in the [app/page.mdx](./app/page.mdx) file:

```shell
error  Unable to resolve path to module '@/components/ExampleComponent'  import/no-unresolved
```

## workaround

if you downgrade eslint-import-resolver-typescript:

```
npm i eslint-import-resolver-typescript@3.7.0 --save-exact --save-dev
```

and then start the linting process again then you will NOT get any linting error

## development

clone this project in your IDE

then install the dependencies:

```
npm i
```

## stack history

installation commands used to create this project

install next.js (15.2.1) using create-next-app:

```shell
npx create-next-app@latest .
```

questions answered like this:

```shell
√ Would you like to use TypeScript? ... Yes
√ Would you like to use ESLint? ... Yes
√ Would you like to use Tailwind CSS? ... No
√ Would you like your code inside a `src/` directory? ... No
√ Would you like to use App Router? (recommended) ... Yes
√ Would you like to use Turbopack for `next dev`? ... No
√ Would you like to customize the import alias (`@/*` by default)? ... Yes
√ What import alias would you like configured? ... @/*
```

add MDX support and types:

```shell
npm i @next/mdx @mdx-js/loader --save-exact
```

```shell
npm i @types/mdx --save-exact --save-dev
```

install eslint plugins:

```shell
npm i typescript-eslint eslint-plugin-mdx eslint-plugin-import eslint-import-resolver-typescript jiti --save-exact --save-dev
```