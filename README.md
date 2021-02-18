# ![Revars logo](/revars.svg "Logo")
![npm](https://img.shields.io/npm/v/revars)
![GitHub](https://img.shields.io/github/license/alevnyacow/revars)
![GitHub last commit](https://img.shields.io/github/last-commit/alevnyacow/revars)
![npm](https://img.shields.io/npm/dm/revars)
![GitHub top language](https://img.shields.io/github/languages/top/alevnyacow/revars)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# 💫 About

Revars (React variables) is a React **state management system** which is

- mutable
- simple 
- no boilerplate code needed

# 📚 Core concept

Basically, every revar is just a javascript object with mutable fields. This object can have nested objects at any level and arrays. Core concept is dead easy - you use [*buildRevar*](#create-revar) to obtain array of two elements. First element is the revar object itself (which is absolutely mutable), second element is a hook you can use in functional components to make them rerender when accorded revar is somehow changed. Simple and powerful! 🚀

# 📔 API

There is one method you can import from this package.

## <a id='create-use-revar'></a>**buildRevar**

```ts
function buildRevar<T extends object>(initialState: T): [T, () => void]
```

Returns a tuple of revar itself and a hook which can be used for functional components rerendering.

# ✨ Example

```ts
import React, { useEffect } from "react";
import { buildRevar } from "revars";

const [counter, useCounterRerender] = buildRevar({ currentValue: 0 });

function useCounterIncrement() {
    useEffect(() => {
        let interval = setInterval(() => {
            // modifying revar in hook
            counter.currentValue++;
        }, 1000);

        return () => clearInterval(interval); 
    })
}

function setRandomCounterValue() {
    // modifying revar in independent module
    counter.currentValue = Math.random();
}

function counterIsMoreThan10() {
    // obtaining revar in independent module
    return counter.currentValue > 10;
}

function Counter() {
    // hook we use to make component rerender on every revar change
    useCounterRerender();
    useCounterIncrement();

    const resetCounter = () => {
        // modifying revar in component
        counter.currentValue = 0;
    }

    return <div>
        <span>Counter value - {counter.currentValue}</span>
        {counterIsMoreThan10() && <span> ( already more than 10!)</span>}
        <button onClick={() => resetCounter()}>Reset counter</button>
        <button onClick={() => setRandomCounterValue()}>Set random counter</button>
    </div>
}
```

# 💥 Warning

Package is still under development and pretty unstable. Do not use it in production code for now.

Thank you for choosing revars! ☕