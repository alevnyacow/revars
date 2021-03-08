# <p align="center">![Revars logo](/revars.svg "Logo")</p>
![npm](https://img.shields.io/npm/v/revars)
![GitHub](https://img.shields.io/github/license/alevnyacow/revars)
![GitHub last commit](https://img.shields.io/github/last-commit/alevnyacow/revars)
![GitHub top language](https://img.shields.io/github/languages/top/alevnyacow/revars)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
![Minzipped Size](https://badgen.net/bundlephobia/minzip/revars)

# 🔍 What is it?

Revars (React variables) is a React **state management system** which is

-  very simple and intuitive
-  incredibly fast
-  extremely lightweight (only 1kb gzipped!) and dependency-free
-  no boilerplate code needed

# 🧰 How does it work?

This package makes it possible to **turn any object into a React application state part**. Take an object of any structure (*arrays and any nesting levels are allowed*), pass it through [buildRevar](#build-revar) method and your state is ready to go! Also you are able to use any count of Revars in your application. Simple and powerful!

Revar is a recursive JS-proxy, which notifies subscribed components making them rerender every time this Revar is modified. Components can subscribe for this Revar changes by using according hook.

So, when you use [buildRevar](#build-revar) method, you obtain an array of three elements.

- **First element** is a Revar itself
- **Second element** is the React hook
- **Third element** is a function can be used to add plugins for current Revar (unstable experimental feature for now).

# 💡 Simple example

```ts
import React, { useEffect } from "react";
import { buildRevar } from "revars";

const [counter, useCounterRerender] = buildRevar({ currentValue: 0 });

function Counter() {
    useCounterRerender();

    return <div>
        <span>Counter value - {counter.currentValue}</span>
        <button onClick={() => { counter.currentValue = 0; }}>
            Reset counter
        </button>
    </div>
}
```
# 📖 More complex examples

- **[Todo List](https://codesandbox.io/s/revars-complex-todos-demo-77qo3)**
- **[Bored API Example](https://codesandbox.io/s/revars-bored-api-example-d4oiw)**

# 📔 API

There is one method you can import from this package.

## <a id='build-revar'></a>**buildRevar**

```ts
function buildRevar<T extends object>(initialState: T): [
    T,
    () => void,
    (plugin: Plugin) => void // not stable for now
]
```