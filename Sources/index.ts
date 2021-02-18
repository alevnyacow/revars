import { v4 } from "uuid";
import { useEffect, useState, useRef } from "react";
import { createRevarProxy } from "./Services";
import { callRerenders, subscribe, unsubscribe } from "./Services";

export function buildRevar<T extends object>(initialState: T) {
    const revarId = v4();
    const revar = createRevarProxy(callRerenders)(revarId)(initialState);

    function useRevarRerender() {
        const rerendererId = useRef(v4());
        const [, setNewFlag] = useState("");
        const rerenderer = () => setNewFlag(v4());

        useEffect(() => {
            subscribe(revarId, rerendererId.current, rerenderer);

            return () => unsubscribe(revarId, rerendererId.current);
        }, []);
    }

    return [revar, useRevarRerender] as [T, () => void];
}
