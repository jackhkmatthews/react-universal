# React Router Server Rendering (WIP)

> notes on [this](https://tylermcginnis.com/react-router-server-rendering/) article

- biggest benefit is SEO, second is load time on client
- have to consider how the different environments will affect your code / how your code depends on it's environment e.g does your code new `window` this is present on the client but no on the browser.
- also need to consider how routing will work on the server Vs browser.
- we want to build a **Universal App** (works on server and client)
- thing is we write a Universal App but this gets built into separate client and server apps by webpack. webpack can set different global variable per build. This means when we write out Universal App we can conditionally do one thing or the other depending on how that code has been built (client or server)
- can configure Babel in package.json

# Webpack config

- don't bundle node modules that the server needs because that is unnecessary - those modules will be installed on the server

# Hello world

- 3 folders, server, browser and shared. The universally written code lives in shared (e.g components). The server specific code (express, index.html, the react templating logic) lives in server and the browser specific code (bootstrapping react to element in dom / hydrating app) lives in browser.
- server code transpiled into server.js. This is what handles requests, serves static assets and created dynamic html doc.
- browser code transpiled into public/bundle.js. This is linked in the index.html doc and will be requested after the index.html request.
- can feed components different initial state depending on server or browser
- need to feed initial state to server app, this same state needs to be accessible to the client app so that when it loads they are identical.
- similar to angular can store this initial state as a serialized JSON object in the HTML doc we send from the server. The client app can then refer to this.
- this feels way simpler than angular - not so much an 'angular way

# Routing

- React Router is dynamic, as you render more components more routes become available. How do we get the server app to understand this (need to understand as needs to know which data to fetch)
- have to abstract route information into a static route config object. This will be used by the server and the client.
- route config consists of an array of routes. Each route had a path, component and other options.
- one of these options is `fetchInitialData` where we can pass a function with path as an argument. In this function we can make a call to our API
- in server/index.js we can loop over these routes, find the matching one, then if it has a `fetchInitialData` function we use that to first get data, then pass that data to the app via the `context` prop of the `StaticRouter` component.