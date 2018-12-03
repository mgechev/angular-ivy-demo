# Angular Ivy Demo

This repository demonstrates simplified API for using Angular enabled by ivy.

**Disclaimer**: the APIs below are highly experimental and likely to change. The produced bundle by parcel is not tree-shaked, which means that it'll be significant bigger than what Angular CLI will produce once Ivy is officially released.

## Overview

The entire application is within `index.html` and `index.ts`. The `index.ts` file contains two components and a pipe. There are two important points to notice:

- **There are no `@NgModule`s**
- **There are no zones**
- We don't use rxjs explicitly

This already reduces the learning curve dramatically by cutting three of the most misunderstood concepts in Angular. **Keep in mind that Ivy does not deprecate NgModules and zones, they'll keep function the way they do today. The only difference is that with the new rendering they become optional**.

## Usage

To try the demo:

```
git clone git@github.com:mgechev/angular-ivy-demo
cd angular-ivy-demo && npm i
npm start
```

Now open http://localhost:1234.

Try to create a "Hello, World!" application by:

* Create a file called `hello-world.html` with the following content:

```html
<!DOCTYPE html>
<html lang="en">
<body>
    <app></app>
    <script src="compiler.umd.js"></script>
    <script src="hello-world.ts"></script>
</body>
</html>
```

* Create a file called `hello-world.ts` with the following content:

```typescript
import {Component, ɵrenderComponent as renderComponent} from '@angular/core';

@Component({
  selector: 'app',
  template: 'Hello, World!'
})
class AppComponent {}

renderComponent(AppComponent);
```

* Run the following command:

```
./node_modules/.bin/parcel hello-world.html
```

## License

MIT

