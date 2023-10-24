import { runningOnBrowser } from "./environment.js";
import { resetStatus } from "./data.js";
import { removeClass } from "./class.js";
import { filterErrorElements, queryElements } from "./dom.js";

export const retryLazyLoad = (settings, instance) => {
  const errorElements = filterErrorElements(queryElements(settings));
  errorElements.forEach((element) => {
    removeClass(element, settings.class_error);
    resetStatus(element);
  });
  instance.update();
};

export const setOnlineCheck = (settings, instance) => {
  if (!runningOnBrowser) {
    return;
  }
  instance._onlineHandler = () => {
    retryLazyLoad(settings, instance);
  };
  window.addEventListener("online", instance._onlineHandler);
};

export const resetOnlineCheck = (instance) => {
  if (!runningOnBrowser) {
    return;
  }
  window.removeEventListener("online", instance._onlineHandler);
};
