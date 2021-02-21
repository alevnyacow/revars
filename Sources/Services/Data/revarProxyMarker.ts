const markerFieldName = "`*`";
const markerValue = true;

export const isMarkedObject = (target: any) =>
    target[markerFieldName] === markerValue;

export const markObject = (target: any) => {
    target[markerFieldName] = markerValue;
};
