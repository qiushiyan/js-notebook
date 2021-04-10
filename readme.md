# Usage

An interactive notebook for JavaScript.

To use the app, install the package globally via

```
# npm
npm install -g javascript-notebook
# yarn
yarn global add javascript-notebook
```

and then navigate to https://localhost:3001

For a quick preview, go to https://javascript-notebook.netlify.app/, where you can still code but not save to local files.

# Technologies

The app is mainly put together with React and TypeScript, with the help of

- **Redux and Redux Toolkit**: for state management and asynchronous logic via redux thunk

- **esbuild-wasm**: for code transpiling and bundling inside the browser

- **Vite**: for local development server

# Challenges

## Code bundling and execution inside the browser

`esbuild-wasm` enables us to use esbuild for code bundling inside the browser.
To allow users to import any npm module without haivng to download it locally, the app need a way of telling esbuild-wasm to first resolve the repository where these source files are stored, and then fetch the source code, a job [plugins](packages/local-client/src/bundler/plugins) are design to do. Then esbuild-wasm will take care of the transpiling and bundling process.

After code bundling is done, we need to execute the bundle. It is undesirbale to allow user-provided code to run directly inside the current DOM, since they might result in errors or mutate the dom and evenutally crash the app. There also might be malicious code provided by other user trying to reach personal data like cookies.

To solve this, the app runs JavaScript in a child `iframe`, so that all the code will be executed in the context of a child html page instead, and direct communication between the iframe and the other parts of the app can be blocked. Inside the iframe, an `message` event listener has been added to evaluate any code attached to it. Whenever an input state is updated and esbuild returns the bundled code, we trigger the message event by with the `postMessage` api and let the iframe `eval` the bundled code.

## Error handling

There are different types of errors that need to be treated differently, since the app would have to provide some consistent error feedback inside the iframe.

- bundle-time error and run-time synchronous error : can simply be handlded with a **customized** `try ... catch` block inside bundlers or the evaluation process in the iframe

- run-time asynchronous error: need to add an extra error event listener in the iframe, because `eval` will not throw an error if the code has some asynchronous logic
