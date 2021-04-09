# Usage

An interactive notebook for JavaScript

<!-- To use the app locally, run

```
npx javascript-notebook serve
```

and then navigate to https://localhost:3001 -->

<!-- # More about the app

## Technologies

The app is mainly put together with React and TypeScript. The following tools serve one or two specific purpose.

- **Redux and Redux Toolkit**: state management and asynchronous logic via redux thunk

- **esbuild-wasm**: transpile and bundle user input code

- **Vite**: start local server and build the entire app

## Challenges

### Transpiling and bundling user input

esbuild-wasm enables us to use esbuild inside the browser.
To allow users to import any npm module without haivng to download it locally, for example `import React from "react"` will "just work", the app need a way of telling esbuild-wasm to first resolve the repository where these source files are stored, and then fetch the source code.

### Code execution inside the browser

There would be some serious problems if user-provided code is directly directly inside the current DOM, since they might result in errors or mutate the dom and evenutally crash the app. There also might be malicious code provided by other user trying to reach personal data like cookies.

To solve this, we run JavaScript in a child `iframe`, so that all the code will be executed in the context of a child html page instead, and direct communication between the iframe and the other parts of the app can be blocked. Inside the iframe, an `message` event listener has been added to evaluate any code attached to it. Whenever an input state is updated and esbuild returns the bundled code, we trigger the message event by with the `postMessage` api and let the iframe `eval` the bundled code.

---

There are also different types of errors that need to be treated differently, since the app would have to provide some consistent error feedback inside the iframe.

- bundle-time error and run-time synchronous error : can simply be handlded with a **customized** `try ... catch` block inside bundlers or the evaluation process in the iframe

- run-time asynchronous error: need to add an extra error event listener in the iframe, because `eval` will not throw an error if the code has some asynchronous logic -->
