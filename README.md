# angular-nx-firebase-monorepo

This is a basic structure of Angular mono repo using Nx to configure, maintain, and especially integrate various tools
and frameworks.

## Features

- 🎈 Syntax Highlighting
- 💎 Responsive design
- 🚀 Production-ready

### Technologies:

- 🔥 Nx & Angular
- 🎨 Material
- 🎉 TypeScript
- ✏️ ESLint (Airbnb styled guide, Automatically remove unused imports and, etc.) Import sorting)
- 🛠 Prettier
- 🚫 lint-staged
- 🚨 Commitlint & commitizen
- 🐶 Husky - Run scripts on your staged files before they are committed.

## Start the app

First of all, create a firebase project and config the `apps/coins/src/environments/environment.development.ts`. Don't
forget to enable the authentications!

To start the development server run `nx serve coins`. Open your browser and navigate to http://localhost:4200/. Happy
coding!

## Generate code

If you happen to use Nx plugins, you can leverage code generators that might come with it.

Run `nx list` to get a list of available plugins and whether they have generators. Then run `nx list <plugin-name>` to
see what generators are available.

Learn more about [Nx generators on the docs](https://nx.dev/plugin-features/use-code-generators).

## Running tasks

To execute tasks with Nx use the following syntax:

```
nx <target> <project> <...options>
```

You can also run multiple targets:

```
nx run-many -t <target1> <target2>
```

..or add `-p` to filter specific projects

```
nx run-many -t <target1> <target2> -p <proj1> <proj2>
```

Targets can be defined in the `package.json` or `projects.json`. Learn more
[in the docs](https://nx.dev/core-features/run-tasks).

## Want better Editor Integration?

Have a look at the [Nx Console extensions](https://nx.dev/nx-console). It provides autocomplete support, a UI for
exploring and running tasks & generators, and more! Available for VSCode, IntelliJ and comes with a LSP for Vim users.

## Ready to deploy?

Run `npx nx build coins` to build the application. The build artifacts are stored in the output directory (e.g. `dist/`
or `build/`), ready to be deployed.

## Set up CI!

Nx comes with local caching already built-in (check your `nx.json`). On CI you might want to go a step further.

- [Set up remote caching](https://nx.dev/core-features/share-your-cache)
- [Set up task distribution across multiple machines](https://nx.dev/nx-cloud/features/distribute-task-execution)
- [Learn more how to setup CI](https://nx.dev/recipes/ci)
