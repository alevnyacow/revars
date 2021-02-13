
![Revars logo](/revars.svg "Logo")

# About

Revars (React variables) is a React **state management system** which is

- mutable
- simple
- no boilerplate code needed

# Example

## state.ts

```ts
import { createUseRevar } from "revars";

export const useCounter = createUseRevar({ value: 0 });
```

## counterControls.tsx

```ts
import React from "react";
import { useCounter } from "./state";

export const CounterControls: React.FC = () => {
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
import {useCounter} from "./state";

export const Counter: React.FC = () => {
    const counter = useCounter();

    return <span>Current counter value: {counter.value}</span>
}
```

## counterApp.tsx

```ts
import React from "react";
import { Counter } from "./counter";
import { CounterControls } from "./counterControls"

export const CounterApp: React.FC = () => {
    return <>
        <Counter />
        <CounterControls />
    </>
}
```

# Warning

Package is still under development and pretty unstable. Do not use it in production code for now.
