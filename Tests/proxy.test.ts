// @ts-nocheck

import { createRevarProxy } from "../Sources/Services";
import { getRandomString } from "../Sources/Utils";
let revarId = "";

beforeEach(() => {
    revarId = getRandomString();
});

test("plain number proxy", () => {
    let count = 0;
    const source = { a: 0 };
    const proxy = createRevarProxy([
        (revarId, propName, propValue) => {
            if (typeof propValue === "number") {
                count += propValue;
            }
        }
    ])(revarId)(source);

    proxy.a = 10;
    proxy.a = 20;
    proxy.a = 30;

    proxy.b = { f: 44 };
    proxy.b.f = 60;

    expect(count).toBe(120);
});

test("plain string proxy", () => {
    let resultString = "";
    const source = { a: "" };
    const proxy = createRevarProxy([
        (revarId, propName, propValue) => {
            if (typeof propValue === "string") {
                resultString += propValue;
            }
        }
    ])(revarId)(source);

    proxy.a += "a";
    proxy.a += "b";
    proxy.a += "c";

    expect(resultString).toBe("aababc");
});

test("nested number proxy at third level", () => {
    let count = 0;
    const source = { a: { b: { c: 0 } } };
    const proxy = createRevarProxy([
        (revarId, propName, propValue) => {
            if (typeof propValue === "number") {
                count += propValue;
            }
        }
    ])(revarId)(source);

    proxy.a.b = { c: 0, d: [] };
    proxy.a.b.c = 10;
    proxy.a.b.d.push({ b: 64 });

    proxy.a.b.d[0].b = 55;

    expect(count).toBe(65);
});

test("array proxy", () => {
    let count = 0;
    const source = { a: [0] };
    const proxy = createRevarProxy([
        (a, b, c) => {
            // console.log(a);
            console.log(b);
            // console.log(c);
            count++;
        }
    ])(revarId)(source);

    console.log("``push");
    proxy.a.push(6);

    console.log("``splice");
    proxy.a.splice(0, 1);

    console.log("``push");
    proxy.a.push(7);

    console.log("``pop");
    proxy.a.pop();

    console.log("``shift");
    proxy.a.shift();

    console.log(count);
    expect(count).toBeGreaterThanOrEqual(5);
});
