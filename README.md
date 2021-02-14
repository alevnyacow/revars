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

Basically, every revar is *just a javascript object with mutable fields*. Core concept is dead easy - function you obtain via [*createUseRevar*](#create-use-revar) can be used **anywhere**. If it's used inside of a functional component **as a hook** you obtain revar value and this component will be rerendered every time this revar is changed. If it's used anywhere **outside of a functional component** you just obtain revar value and you are still able to modify it.

# 🌟 API

## <a id='create-use-revar'></a>**createUseRevar**

```ts
function createUseRevar<T extends object>(initialState: T): () => T
```

# ✨ Example

Let's take a look at a little counter example. We will be using revars in functional React components and in a independent service. If you want to see revars in action [feel free to take a look at complex example at codesandbox!](https://codesandbox.io/s/revars-simple-example-kqh0s) 🚀


## 🗒 state.ts

```ts
import { createUseRevar } from "revars";

type Counter = { value: number };

export const useCounter = createUseRevar<Counter>({ value: 0 });
```

## 🗒 randomCounterService.ts

```ts
import { useCounter } from "./state";

export const setRandomCounter = () => {
    // using Revar outside of a functional React component
    const counter = useCounter();
    counter.value = Math.random();
};
```

## 🗒 counterControls.tsx

```ts
import React from "react";
import { useCounter } from "./state";

export const CounterControls: React.FC = () => {
    // using Revar as a hook
    const counter = useCounter();

    const incrementCounter = () => counter.value += 1;
    const decrementCounter = () => counter.value -= 1;
    const resetCounter = () => counter.value = 0;

    return <>
        <button onClick={decrementCounter}>Decrement</button>
        <button onClick={resetCounter}>Reset</button>
        <button onClick={incrementCounter}>Increment</button>
    </>
};
```

## 🗒 counter.tsx

```ts
import React from "react";
import { useCounter } from "./state";

export const Counter: React.FC = () => {
    // using Revar as a hook
    const counter = useCounter();

    return <span>Current counter value: {counter.value}</span>
};
```

## 🗒 counterApp.tsx

```ts
import React from "react";
import { setRandomCounter } from "./randomCounterService";
import { Counter } from "./counter";
import { CounterControls } from "./counterControls";

export const CounterApp: React.FC = () => {
    return <>
        <Counter />
        <CounterControls />
        <button onClick={setRandomCounter}>Set random counter</button>
    </>
};
```

# 💥 Warning

Package is still under development and pretty unstable. Do not use it in production code for now.

Thank you for choosing revars! ☕