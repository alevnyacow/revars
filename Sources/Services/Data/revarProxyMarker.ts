const markerFieldName = "950fcad6-a930-4085-9793-25eeb09482ab";
const markerValue = true;

export const isMarkedObject = (target: any) =>
    target[markerFieldName] === markerValue;

export const markObject = (target: any) => {
    target[markerFieldName] = markerValue;
};
