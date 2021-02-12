import { spreadingProxy } from "./utils";

const proxyGen = spreadingProxy({
    set: (target, prop, value) => {
        // eslint-disable-next-line no-console
        console.log("hello");
        // eslint-disable-next-line no-console
        console.log(prop);
        // eslint-disable-next-line no-console
        console.log(value);

        (target as any)[prop] = value;

        return true;
    }
});

const d23 = proxyGen({ a44: { b2222: 11 }, b55: 15 });

d23.a44.b2222 = 55;
d23.b55 = 4;
