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

Basically, every revar is just a javascript object with mutable fields. This object can have nested objects at any level and arrays. Core concept is dead easy - function you obtain via [*createUseRevar*](#create-use-revar) can be used **anywhere**. If it's used inside of a functional component **as a hook** you obtain revar value and this component will be rerendered every time this revar is changed. If it's used anywhere **outside of a functional component** you just obtain revar value and you are still able to modify it. Simple and powerful! 🚀

# 📔 API

There is one method you can import from this package.

## <a id='create-use-revar'></a>**createUseRevar**

```ts
function createUseRevar<T extends object>(initialState: T): () => T
```

Returns a function which obtains revar value and provides functional components to be rerendered on revar changes.

# ✨ Example

If you want to see revars in action [feel free to take a look at complex example at codesandbox!](https://codesandbox.io/s/revars-simple-example-kqh0s)

# 💥 Warning

Package is still under development and pretty unstable. Do not use it in production code for now.

Thank you for choosing revars! ☕