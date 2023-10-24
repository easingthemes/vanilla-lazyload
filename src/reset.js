import { SIZES, SRC, SRCSET } from "./constants.js.js";
import { forEachPictureSource } from "./forEachSource.js";

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
