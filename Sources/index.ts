import { useEffect, useState, useRef } from "react";
import {
    createRevarProxy,
    callRerenders,
    subscribe,
    unsubscribe
} from "./Services";
import { getRandomString } from "./Utils";

export function buildRevar<T extends object>(initialState: T) {
    const revarId = getRandomString();
    const revar = createRevarProxy(callRerenders)(revarId)(initialState);

    function useRevarRerender() {
        const rerendererId = useRef(getRandomString());
        const [, setNewFlag] = useState("");
        const rerenderer = () => setNewFlag(getRandomString());

        useEffect(() => {
            subscribe(revarId, rerendererId.current, rerenderer);

            return () => unsubscribe(revarId, rerendererId.current);
        }, []);
    }

    return [revar, useRevarRerender] as [T, () => void];
}
