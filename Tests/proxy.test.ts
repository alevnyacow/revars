import { v4 } from "uuid";
import { createRevarProxy } from "../Sources/Services";

let revarId = "";

beforeEach(() => {
    revarId = v4();
});

test("plain number proxy", () => {
    let count = 0;
    const source = { a: 0 };
    const proxy = createRevarProxy((revarId, propName, propValue) => {
        if (typeof propValue === "number") {
            count += propValue;
        }
    })(revarId)(source);

    proxy.a = 10;
    proxy.a = 20;
    proxy.a = 30;

    expect(count).toBe(60);
});

test("plain string proxy", () => {
    let resultString = "";
    const source = { a: "" };
    const proxy = createRevarProxy((revarId, propName, propValue) => {
        if (typeof propValue === "string") {
            resultString += propValue;
        }
    })(revarId)(source);

    proxy.a += "a";
    proxy.a += "b";
    proxy.a += "c";

    expect(resultString).toBe("aababc");
});

test("nested number proxy at third level", () => {
    let count = 0;
    const source = { a: { b: { c: 0 } } };
    const proxy = createRevarProxy((revarId, propName, propValue) => {
        if (typeof propValue === "number") {
            count += propValue;
        }
    })(revarId)(source);

    proxy.a.b = { c: 0 };
    proxy.a.b.c = 10;

    expect(count).toBe(10);
});

// test("nested number proxy at third level", () => {
//     let count = 0;
//     const source = { a: { b: { c: 0 } } };
//     const toProxy = spreadingProxy({
//         set: (targetObject, propertyName, propertyValue) => {
//             console.log(propertyName);
//             /**
//                 // ! Excess set calls
//                 if (typeof propertyValue === "object" && propertyValue !== null) {
//                     propertyValue = toProxy(propertyValue);
//                 }
//              */

//             (targetObject as any)[propertyName] = propertyValue;

//             if (typeof propertyValue === "number") {
//                 console.log(propertyValue);
//                 count += propertyValue;
//             }

//             return true;
//         }
//     });

//     const proxy = toProxy(source);

//     proxy.a.b.c = 10;

//     expect(count).toBe(10);
// });
