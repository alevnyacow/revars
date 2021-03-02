# <p align="center">![Revars logo](/revars.svg "Logo")</p>
![npm](https://img.shields.io/npm/v/revars)
![GitHub](https://img.shields.io/github/license/alevnyacow/revars)
![GitHub last commit](https://img.shields.io/github/last-commit/alevnyacow/revars)
![GitHub top language](https://img.shields.io/github/languages/top/alevnyacow/revars)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
![Minzipped Size](https://badgen.net/bundlephobia/minzip/revars)

# 💫 About

Revars (React variables) is a React **state management system** which is

-  very simple and intuitive
-  incredible fast
-  extremely lightweight *(only 1kb gzipped!)* and dependency-free
-  no boilerplate code needed

# 📚 Core concept

When you use [buildRevar](#build-revar) method, you obtain a tuple of three elements.

- **First element** is a Revar itself. Basically it behaves like a usual object with mutable fields so you can modify it anywhere in your code (including array mutating methods).
- **Second element** is a React hook. Use it in functional components to make them rerender when according revar is modified.
- **Third element** is a function can be used to add plugins for current Revar (**unstable experimental feature for now**).

Take a look at following example:

```ts
type Analytics = {
    clicks: number;
    secondsSpentOnPage: number;
    events: Array<string>;
};

const [analytics, useAnalyticsRerender] = buildRevar<Analytics>({ 
    clicks: 0, 
    secondsSpentOnPage: 0,
    events: []
});

// You are able to use any count of Revars in application
const [rectangle, useRectangleRerender] = buildRevar({ 
    width: 0, 
    height: 0 
});
```

# 📔 API

There is one method you can import from this package.

## <a id='build-revar'></a>**buildRevar**

```ts
function buildRevar<T extends object>(initialState: T): [
    T,
    () => void,
    (plugin: Plugin) => void
]
```

# 🧩 Exported types

There is one exported type in this package which is plugin function signature.

```ts
type Plugin = (
    revarId: string,
    propertyName?: string | number | symbol,
    propertyValue?: any
) => void;
```

# ✨ Simple example

```ts
import React, { useEffect } from "react";
import { buildRevar } from "revars";

const [counter, useCounterRerender] = buildRevar({ currentValue: 0 });

function useCounterIncrement() {
    useEffect(() => {
        const interval = setInterval(() => {
            counter.currentValue++;
        }, 1000);

        return () => clearInterval(interval); 
    }, [])
}

function Counter() {
    useCounterRerender();
    useCounterIncrement();

    return <div>
        <span>Counter value - {counter.currentValue}</span>
        <button onClick={() => { counter.currentValue = 0; }}>
            Reset counter
        </button>
    </div>
}
```

# 🌌 More complex examples

- **[Todo List](https://codesandbox.io/s/revars-complex-todos-demo-77qo3)**