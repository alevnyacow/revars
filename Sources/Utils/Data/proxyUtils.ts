// @ts-nocheck

export function spreadingProxy(handler: ProxyHandler<object>) {
    return function <T extends object>(target: T) {
        target[process.env.IS_PROXIED_FIELD_NAME!] = true;
        const toReturn = new Proxy(target, handler) as T;

        function spreadData(target: T) {
            const keys = Object.keys(target) as Array<keyof T>;

            for (const key of keys) {
                if (typeof target[key] === "object" && target[key] !== null) {
                    target[key][process.env.IS_PROXIED_FIELD_NAME!] = true;
                    target[key] = new Proxy(target[key] as any, handler) as any;
                    spreadData(target[key] as any);
                }
            }
        }

        spreadData(toReturn);

        return toReturn;
    };
}
