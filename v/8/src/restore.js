import { removeClass } from "./class.js";

import { hasEmptyStatus, hasStatusNative, resetStatus } from "./data.js";
import { forEachPictureSource, forEachVideoSource } from "./forEachSource.js";
import {
  attrsData,
  attrsSrc,
  attrsSrcPoster,
  attrsSrcSrcsetSizes,
  deleteOriginalAttrs,
  restoreOriginalAttrs,
  restoreOriginalBgImage
} from "./originalAttributes.js";

export const restoreImg = (imgEl) => {
  forEachPictureSource(imgEl, (sourceEl) => {
    restoreOriginalAttrs(sourceEl, attrsSrcSrcsetSizes);
  });
  restoreOriginalAttrs(imgEl, attrsSrcSrcsetSizes);
};

export const restoreVideo = (videoEl) => {
  forEachVideoSource(videoEl, (sourceEl) => {
    restoreOriginalAttrs(sourceEl, attrsSrc);
  });
  restoreOriginalAttrs(videoEl, attrsSrcPoster);
  videoEl.load();
};

export const restoreIframe = (iframeEl) => {
  restoreOriginalAttrs(iframeEl, attrsSrc);
};

export const restoreObject = (objectEl) => {
  restoreOriginalAttrs(objectEl, attrsData);
};

const restoreFunctions = {
  IMG: restoreImg,
  IFRAME: restoreIframe,
  VIDEO: restoreVideo,
  OBJECT: restoreObject
};

const restoreAttributes = (element) => {
  const restoreFunction = restoreFunctions[element.tagName];
  if (!restoreFunction) {
    restoreOriginalBgImage(element);
    return;
  }
  restoreFunction(element);
};

const resetClasses = (element, settings) => {
  if (hasEmptyStatus(element) || hasStatusNative(element)) {
    return;
  }
  removeClass(element, settings.class_entered);
  removeClass(element, settings.class_exited);
  removeClass(element, settings.class_applied);
  removeClass(element, settings.class_loading);
  removeClass(element, settings.class_loaded);
  removeClass(element, settings.class_error);
};

export const restore = (element, settings) => {
  restoreAttributes(element);
  resetClasses(element, settings);
  resetStatus(element);
  deleteOriginalAttrs(element);
};
