
# ![Revars logo](/revars.svg "Logo")

# 💫 About

Revars (React variables) is a React **state management system** which is

- mutable
- simple 
- no boilerplate code needed

# 🌟 API

## **createUseRevar**

```ts
function createUseRevar<T extends object>(initialState: T): () => T
```

### Description

It takes initial revar value as a parameter and returns the function which can basically works in two modes:

- If you use it **as a hook in a functional React component** it returns current revar value and makes component rerender when this revar changes 
- If you use it **anywhere outside of a functional React component** it just returns current revar value 

# ✨ Example

Let's take a look at a little counter example. We will be using revars in functional React components and in a independent service.  

## state.ts

```ts
import { createUseRevar } from "revars";

export const useCounter = createUseRevar({ value: 0 });
```

## randomCounterService.ts

```ts
import { useCounter } from "./state";

export const setRandomCounter = () => {
    // using Revar outside of a functional React component
    const counter = useCounter();
    counter.value = Math.random();
}
```

## counterControls.tsx

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
}
```

## counter.tsx

```ts
import React from "react";
import { useCounter } from "./state";

export const Counter: React.FC = () => {
    // using Revar as a hook
    const counter = useCounter();

    return <span>Current counter value: {counter.value}</span>
}
```

## counterApp.tsx

```ts
import React from "react";
import { setRandomCounter } from "./randomCounterService";
import { Counter } from "./counter";
import { CounterControls } from "./counterControls"

export const CounterApp: React.FC = () => {
    return <>
        <Counter />
        <CounterControls />
        <button onClick={setRandomCounter}>Set random counter</button>
    </>
}
```

# 💥 Warning

Package is still under development and pretty unstable. Do not use it in production code for now.

Thank you for choosing revars! 