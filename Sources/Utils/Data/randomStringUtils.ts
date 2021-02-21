export function getRandomString() {
    const twoMathRandomStrings =
        Math.random().toString() + Math.random().toString();

    return twoMathRandomStrings.replace(/(0([.]|[,]))/g, "");
}
