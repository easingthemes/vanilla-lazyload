import { loadNative } from "./load.js";
import { setToLoadCount } from "./counters.js";

const tagsWithNativeLazy = ["IMG", "IFRAME", "VIDEO"];

export const shouldUseNative = (settings) =>
  settings.use_native && "loading" in HTMLImageElement.prototype;

export const loadAllNative = (elements, settings, instance) => {
  elements.forEach((element) => {
    if (tagsWithNativeLazy.indexOf(element.tagName) === -1) {
      return;
    }
    loadNative(element, settings, instance);
  });
  setToLoadCount(instance, 0);
};
