import { spreadingProxy } from "../Sources/Utils";

test("plain number proxy", () => {
    let count = 0;
    const source = { a: 0 };
    const proxy = spreadingProxy({
        set: (targetObject, propertyName, propertyValue) => {
            count += propertyValue as number;
            return true;
        }
    })(source);

    proxy.a = 10;
    proxy.a = 20;
    proxy.a = 30;

    expect(count).toBe(60);
});

test("plain string proxy", () => {
    let resultString = "";
    const source = { a: "" };
    const proxy = spreadingProxy({
        set: (targetObject, propertyName, propertyValue) => {
            resultString += propertyValue;
            return true;
        }
    })(source);

    proxy.a += "hello";
    proxy.a += "cool";
    proxy.a += "world";

    expect(resultString).toBe("hellocoolworld");
});

test("nested number proxy at third level", () => {
    let count = 0;
    const source = { a: { b: { c: 0 } } };
    const toProxy = spreadingProxy({
        set: (targetObject, propertyName, propertyValue) => {
            console.log(propertyName);
            /**
                Do we need this?
                if (typeof propertyValue === "object" && propertyValue !== null) {
                    propertyValue = toProxy(propertyValue);
                }
             */

            (targetObject as any)[propertyName] = propertyValue;

            if (typeof propertyValue === "number") {
                console.log(propertyValue);
                count += propertyValue;
            }

            return true;
        }
    });

    const proxy = toProxy(source);

    proxy.a.b.c = 10;

    expect(count).toBe(10);
});
