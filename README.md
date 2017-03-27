# Reactfire Todo

[![Build Status](https://travis-ci.org/slwen/reactfire-todo.svg?branch=master)](https://travis-ci.org/slwen/reactfire-todo)

Todo application built with React and Firebase, written with ES6 syntax.

[Demo](http://slwen.github.io/reactfire-todo)

## Get Started

1. Clone, install and set up:

  ```sh
  $ git clone https://github.com/slwen/reactfire-todo.git
  $ cd reactfire-todo
  $ yarn run setup
  ```

2. View on: `http://localhost:3000/`

3. If you have your own Firebase URL you can set the store name in `./src/firebase-config.js`.

### Commands

```sh
$ yarn run setup      # Install dependencies, start server and watch.
$ yarn run start      # Start a local server and watch task.
$ yarn run build      # Build public assets.
$ yarn run lint       # Run eslint.
$ yarn run deploy     # Deploy files to gh-pages branch.
$ yarn run test       # Run component tests
$ yarn run watch-test # Run component tests in watch mode
```
