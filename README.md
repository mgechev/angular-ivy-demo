# Angular Ivy Demo

This repository demonstrates simplified API for using Angular enabled by ivy.

## Overview

The entire application is within `index.html` and `index.ts`. The `index.ts` file contains two components and a pipe. There are two important points to notice:

- **There are no `@NgModule`s**
- **There are no zones**
- We don't use rxjs explicitly

This already reduces the learning curve dramatically by cutting three of the most misunderstood concepts in Angular.

## Usage

To try the demo:

```
git clone git@github.com:mgechev/angular-ivy-demo
cd angular-ivy-demo && npm i
npm start
```

Now open http://localhost:1234.

## License

MIT
