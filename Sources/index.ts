import { v4 } from "uuid";
import { useEffect, useState, useRef } from "react";
import { spreadingProxy } from "./Utils";
import { callRerenders, subscribe, unsubscribe } from "./Services";

const toRevarProxy = (revarId: string) =>
    spreadingProxy({
        set: (target, prop, value) => {
            if (typeof value === "object" && value !== null) {
                value = toRevarProxy(revarId)(value);
            }
            (target as any)[prop] = value;
            callRerenders(revarId);
            return true;
        }
    });

export function createUseRevar<T extends object>(initialState: T) {
    const revarId = v4();
    const revarProxy = toRevarProxy(revarId)(initialState);

    function useRevar() {
        try {
            const rerendererId = useRef(v4());
            const [, setNewFlag] = useState("");
            const rerenderer = () => setNewFlag(v4());

            useEffect(() => {
                subscribe(revarId, rerendererId.current, rerenderer);

                return () => {
                    unsubscribe(revarId, rerendererId.current);
                };
            }, []);

            return revarProxy;
        } catch {
            return revarProxy;
        }
    }

    return useRevar;
}
