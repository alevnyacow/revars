import { v4 } from "uuid";
import { useEffect, useState, useRef } from "react";
import { createRevarProxy } from "./Services";
import { callRerenders, subscribe, unsubscribe } from "./Services";

export function createUseRevar<T extends object>(initialState: T) {
    const revarId = v4();
    const revarProxy = createRevarProxy(callRerenders)(revarId)(initialState);

    function useRevar() {
        try {
            const rerendererId = useRef(v4());
            const [, setNewFlag] = useState("");
            const rerenderer = () => setNewFlag(v4());

            useEffect(() => {
                subscribe(revarId, rerendererId.current, rerenderer);

                return () => unsubscribe(revarId, rerendererId.current);
            }, []);

            return revarProxy;
        } catch {
            return revarProxy;
        }
    }

    return useRevar;
}
