import { spreadingProxy } from "../../Utils";

export function createRevarProxy(
    handler: (
        revarId: string,
        propertyName: string | number | symbol,
        propertyValue: any
    ) => void
) {
    return function (revarId: string) {
        return spreadingProxy({
            set: (target, prop, value) => {
                // ? ! ! !
                if (typeof value === "object" && value !== null) {
                    value = createRevarProxy(handler)(revarId)(value);
                }
                (target as any)[prop] = value;
                handler(revarId, prop, value);
                return true;
            }
        });
    };
}
