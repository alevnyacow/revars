import { spreadingProxy } from "../../Utils";
import { isMarkedObject } from "./revarProxyMarker";

export function createRevarProxy(
    handlers: Array<
        (
            revarId: string,
            propertyName: string | number | symbol,
            propertyValue: any
        ) => void
    >
) {
    function toRevarProxyIfNeeded(revarId: string, value: any) {
        if (
            typeof value === "object" &&
            value !== null &&
            !isMarkedObject(value)
        ) {
            return createRevarProxy(handlers)(revarId)(value);
        }

        return value;
    }

    return function (revarId: string) {
        return spreadingProxy({
            set: (target, prop, value) => {
                value = toRevarProxyIfNeeded(revarId, value);
                (target as any)[prop] = value;
                handlers.forEach((handler) => handler(revarId, prop, value));
                return true;
            },
            get: (target, prop) => {
                if (Array.isArray(target)) {
                    if (prop === "push") {
                        return function (...params: any[]) {
                            params = params.map((x) =>
                                toRevarProxyIfNeeded(revarId, x)
                            );
                            target.push(...params);
                            handlers.forEach((handler) =>
                                handler(revarId, prop, prop)
                            );
                        };
                    }
                    if (prop === "pop") {
                        return function () {
                            const result = target.pop();
                            handlers.forEach((handler) =>
                                handler(revarId, prop, prop)
                            );
                            return result;
                        };
                    }
                    if (prop === "shift") {
                        return function () {
                            const result = target.shift();
                            handlers.forEach((handler) =>
                                handler(revarId, prop, prop)
                            );
                            return result;
                        };
                    }
                    return target[prop as any];
                }

                return (target as any)[prop as any];
            }
        });
    };
}
