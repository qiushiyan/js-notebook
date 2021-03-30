# In Progress

An interactive notebook for JavaScript

## Technologies

The app is mainly put together with React and TypeScript. The following tools serve one or two specific purpose.

- **Redux and Redux Toolkit**: state management

- **Redux Thunk**: handle asyncronous logic inside Redux

- **esbuild-wasm**: transpile and bundle user input code

- **Vite**: start local server and build the entire app

## Challenges

### Transpiling and bundling user input

esbuild-wasm enables us to use esbuild inside the browser.
To allow users to import any npm module without haivng to download it locally, for example `import React from "react"` will "just work", we need a way of telling esbuild-wasm to first resolve the repository where these source files are stored, and then fetch the source code.

### Code execution inside the browser

User-provided code may be malicious, result in errors, or mutate the dom.
