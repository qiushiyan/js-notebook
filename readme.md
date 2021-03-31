# In Progress

An interactive notebook for JavaScript

# Usage

# More about the app

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

There would be some serious problems if we execute user-provided code directly inside the app, since they might result in errors or mutate the dom and evenutally crash the app. There also might be malicious code provided by other user trying to reach personal data like cookies.

To solve this, we run JavaScript in a child `iframe`, so that all the code will be executed in the context of a child html page instead, and direct communication between the iframe and the other parts of the app can be blocked.
