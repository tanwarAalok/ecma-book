# Ecma-Book

![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB) ![Redux](https://img.shields.io/badge/Redux-764ABC?logo=redux&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white) ![esbuild](https://img.shields.io/badge/esbuild-WebAssembly-FFCF00?logo=esbuild&logoColor=black) [![npm](https://img.shields.io/npm/v/ecma-book?logo=npm)](https://www.npmjs.com/package/ecma-book)

An interactive, browser-based coding environment, like a Jupyter Notebook but for JavaScript. Write code and Markdown in cells, import npm packages directly, and see the output instantly. Bundling runs in the browser through esbuild compiled to WebAssembly, so there is no server-side build.

## Quick start

```bash
npx ecma-book serve            # opens a notebook at http://localhost:4005, saved to notebook.js
npx ecma-book serve mybook.js  # use a different notebook file
```

## Features

- **Code cells and text cells:** a Monaco editor with Prettier formatting for code, and a Markdown editor for text.
- **Import any npm package** with a normal `import`; esbuild-wasm resolves and bundles it in the browser via unpkg.
- **Cumulative execution:** each code cell can use variables and functions defined in the cells above it.
- **Resizable cells** that can be moved up, moved down or deleted.
- **Caching** of fetched packages with localForage for fast re-runs.
- **Sandboxed preview:** code runs in an isolated iframe, and errors are shown in the cell.
- **Saved to disk:** the CLI's local API persists cells to a file on your machine.

![Ecma-Book notebook](https://user-images.githubusercontent.com/78805153/228725226-9a868a37-63d9-4f15-ab16-6aff097085e5.png)
![Ecma-Book cells](https://user-images.githubusercontent.com/78805153/228725304-6ef62377-f92a-4215-8340-4d8dcdf49fdf.png)

## Monorepo layout

Managed with Lerna:

| Package | What it is |
| --- | --- |
| [`packages/cli`](packages/cli) | `ecma-book` on npm: the CLI that starts the server |
| [`packages/local-api`](packages/local-api) | Express API that serves the client and reads/writes the notebook file |
| [`packages/local-client`](packages/local-client) | React + Redux notebook UI with the in-browser bundler |

## Tech stack

React · Redux · TypeScript · esbuild-wasm · Monaco editor · Express · Commander · Lerna
