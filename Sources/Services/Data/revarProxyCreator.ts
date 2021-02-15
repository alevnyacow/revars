import { spreadingProxy } from "../../Utils";

export function createRevarProxy(
    handler: (
        revarId: string,
        propertyName: string | number | symbol,
        propertyValue: any
    ) => void
) {
    function toRevarProxyIfNeeded(revarId: string, value: any) {
        if (
            typeof value === "object" &&
            value !== null &&
            !value[process.env.IS_PROXIED_FIELD_NAME!]
        ) {
            return createRevarProxy(handler)(revarId)(value);
        }

        return value;
    }

    return function (revarId: string) {
        return spreadingProxy({
            set: (target, prop, value) => {
                value = toRevarProxyIfNeeded(revarId, value);
                (target as any)[prop] = value;
                handler(revarId, prop, value);
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
                            handler(revarId, prop, prop);
                        };
                    }
                    if (prop === "pop") {
                        return function () {
                            const result = target.pop();
                            handler(revarId, prop, prop);
                            return result;
                        };
                    }
                    if (prop === "shift") {
                        return function () {
                            const result = target.shift();
                            handler(revarId, prop, prop);
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
