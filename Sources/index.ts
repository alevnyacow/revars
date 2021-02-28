import { useEffect, useState, useRef } from "react";
import {
    createRevarProxy,
    callRerenders,
    subscribe,
    unsubscribe
} from "./Services";
import { getRandomString } from "./Utils";

export type Plugin = (
    revarId: string,
    propertyName?: string | number | symbol,
    propertyValue?: any
) => void;

export function buildRevar<T extends object>(initialState: T) {
    const revarId = getRandomString();
    const plugins: Record<string, Array<Plugin>> = {
        [revarId]: [callRerenders]
    };
    const revar = createRevarProxy(plugins[revarId])(revarId)(initialState);

    function useRevarRerender() {
        const rerendererId = useRef(getRandomString());
        const [, setNewFlag] = useState("");
        const rerenderer = () => setNewFlag(getRandomString());

        useEffect(() => {
            subscribe(revarId, rerendererId.current, rerenderer);

            return () => unsubscribe(revarId, rerendererId.current);
        }, []);
    }

    function addPlugin(plugin: Plugin) {
        plugins[revarId].push(plugin);
    }

    return [revar, useRevarRerender, addPlugin] as [
        T,
        () => void,
        (plugin: Plugin) => void
    ];
}
