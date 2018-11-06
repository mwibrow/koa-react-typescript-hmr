# Koa-typescript-hmr-proxy

Simple example of using proxying [webpack's](https://webpack.js.org/)
hot-module-reloading with
[React](https://reactjs.org/) and [Koa](https://koajs.com/)
using [Typescript](https://www.typescriptlang.org/).

## Usage

After `npm i` run `npm run watch` and point a browser to `localhost:8000`.

The hot-module-reloading server will be running `localhost:8010` and is
currently set up to serve all (versioned) static content.

Somewhat unnecessarily, [Material UI](https://material-ui.com/)
is used to render the content.
