# <p align="center">![Revars logo](/logo.png "Logo")</p>
![npm](https://img.shields.io/npm/v/revars)
![GitHub](https://img.shields.io/github/license/alevnyacow/revars)
![GitHub last commit](https://img.shields.io/github/last-commit/alevnyacow/revars)
![GitHub top language](https://img.shields.io/github/languages/top/alevnyacow/revars)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
![Minzipped Size](https://badgen.net/bundlephobia/minzip/revars)

# 🔍 What is it?

Revars (React variables) is a **React state management system** which is

-  very simple and intuitive
-  incredibly fast
-  extremely lightweight (only 1kb gzipped!)

# 📖 Codesandbox examples

- **[Todo List](https://codesandbox.io/s/revars-complex-todos-demo-77qo3)**
- **[Bored API Example](https://codesandbox.io/s/revars-bored-api-example-d4oiw)**

# 💡 Simple example

```tsx
import React from "react";
import { buildRevar } from "revars";

const [counter, useCounterRerender] = buildRevar({ currentValue: 0 });
const [stats, useStatsRerenderer] = buildRevar({ 
    buttonClicks: { reset: 0 } 
});

setInterval(() => counter.currentValue++, 1000);

function Counter() {
    useCounterRerender();
    useStatsRerenderer();

    return <div>
        <span>Counter value - {counter.currentValue}</span>
        <button onClick={() => {
            counter.currentValue = 0;
            stats.buttonClicks.reset++;
        }}>
            Reset counter (clicked {stats.buttonClicks.reset} times)
        </button>
    </div>
}
```

Really, like **this** simple. So, let's sum it up:

- You don't need any specific functions to update Revar - feel free to treat it like a usual object
- Use React hook according to a Revar to make functional component rerender whenever this Revar updates 
- You are able to use any count of Revars in your application

# 📜 API

There is one method you can import from this package:

### <a id='build-revar'></a>**buildRevar**

```ts
function buildRevar<T>(initialState: T): [T, () => void]
```