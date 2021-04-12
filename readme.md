# Usage

A command line tool to create browser-based interactive notebook for JavaScript and TypeScript, similar to Jupyter Notebook.

To use the app, enter the following command at your terminal and then navigate to localhost:3001 or whatever port you may specify via the `-p` or `--port` flag.

```
npx javascript-notebook serve
# navigate to https://localhost:3001
```

You can also install the package globally via

```
# npm
npm install -g javascript-notebook
# yarn
yarn global add javascript-notebook
```

Then run

```
javascript-notebook serve
# navigate to https://localhost:3001
```

For a quick preview, go to https://javascript-notebook.netlify.app/, where you can still code but not save to local files.

# More about the app itself

If you would like to know more about the technical side of this app, I briefly discussed the techologies I used and some of its challenges.

## Technologies

The app uses a multi-package setip with the help of [lerna](https://github.com/lerna/lerna). Inside the [packages](packages) folder, there are [`cli`](packages/cli) for digesting command-line arguments and pass it down to local-api, [`local-api`](packages/local-api) which sets up an express server for I/O operations , and [`local-client`](packages/local-client), which implements the actual user interface of code execution logic.

![](diagrams/architecture.svg)

The CLI and local-server is implemented with a rather navie approach, using `commander` and `express`. The frontend is mainly put together with React and TypeScript, with

- `Redux` and `Redux Toolkit`: for state management and asynchronous logic via Redux Thunk

- `esbuild-wasm`: for code transpiling and bundling inside the browser

- `Vite`: for local development server

## Challenge 1: Code bundling and execution inside the browser

There are many options to bundle user input and related third-party packages, webpack, rollup and esbuild, to name a few. However, the bundling process traditionally happens in the server, which calls for a much more complicated implmentation. Luckily, the WebAssembly version of esbuild, `esbuild-wasm` enables code bundling inside the browser.

To allow users to import any npm module without haivng to download it locally, the app need a way of telling `esbuild-wasm` to first resolve the repository where these source files are stored, and then fetch the source code, a job [plugins](packages/local-client/src/bundler/plugins) are designed to do. Then esbuild-wasm will take care of the transpiling and bundling process. Moreover, once a package has been fetched, certain bundling instructions containing its source has been stored will be stored in IndexdDB, which saves fetching for the second time.

After code bundling is done, we need to execute the bundle. It is undesirbale to allow user-provided code to run directly inside the current DOM, since they might result in errors or mutate the dom and evenutally crash the app. There also might be malicious code provided by other user trying to reach personal data like cookies.

To solve this, the app runs JavaScript in a child `iframe`, so that all the code will be executed in the context of a child html page instead, and direct communication between the iframe and the other parts of the app can be blocked. Inside the iframe, an `message` event listener has been added to evaluate any code attached to it. Whenever an input state is updated and esbuild returns the bundled code, we trigger the message event by with the `postMessage` api and let the iframe `eval` the bundled code.

## Challenge 2: Error handling

There are different types of errors that need to be treated differently, since the app would have to provide some consistent error feedback inside the iframe.

- bundle-time error and run-time synchronous error : can simply be handlded with a `try ... catch` block inside bundlers or the evaluation process in the iframe

- run-time asynchronous error: needs to add an extra error event listener in the iframe, because `eval` will not throw an error if the code has some asynchronous logic

## Challenge 3: Cumulative code execution and custom built-in function

In an interactive enviroment, a user typically codes in an tentative and explorative manner, so it's important to keep different code cells connected. Whenever the app runs a code cell, a custom hook [`useCumulative`](packages/local-client/src/hooks/index.ts) is called to collect code from all previous cells into a "cumulative code array" that is joined, bundled and executed altoghter.

There is also a built-in `show()` function that display values in the DOM of the preview window. That function is defined at the top of the cumulative code array. But with cumulative exectuion, DOM operations from previous cells will intercept that of the current cell. The solution is to declare `show()` once at the top, and put in different contents inside its function body, so that only the current cell will receive a functional version with all previous cells receiving an empty function body.

With all that, the following diagram summarises what the code execution process

![](diagrams/code-process.svg)
