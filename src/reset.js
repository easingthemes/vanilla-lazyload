import { forEachPictureSource } from "./forEachSource";
import { SRC, SRCSET, SIZES } from "./constants.js";

const removeImageAttributes = (element) => {
    element.removeAttribute(SRC);
    element.removeAttribute(SRCSET);
    element.removeAttribute(SIZES);
};

export const resetSourcesImg = (element) => {
    forEachPictureSource(element, (sourceTag) => {
        removeImageAttributes(sourceTag);
    });
    removeImageAttributes(element);
};