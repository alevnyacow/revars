const storage: {
    [revarId: string]: { [rerendererId: string]: () => void } | undefined;
} = {};

export function subscribe(
    revarId: string,
    rerendererId: string,
    rerenderer: () => void
) {
    storage[revarId] = storage[revarId] || {};
    storage[revarId]![rerendererId] = rerenderer;
}

export function unsubscribe(revarId: string, rerendererId: string) {
    const rerenderersData = storage[revarId];

    if (!rerenderersData) {
        return;
    }

    delete rerenderersData[rerendererId];
}

export function callRerenders(revarId: string) {
    const rerenderersData = storage[revarId];

    if (!rerenderersData) {
        return;
    }

    Object.values(rerenderersData).forEach((rerenderer) => rerenderer());
}
