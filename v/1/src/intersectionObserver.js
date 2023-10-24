import { supportsIntersectionObserver } from "./environment.js";
import { onEnter, onExit } from "./intersectionHandlers.js";
import { shouldUseNative } from "./native.js";
import { resetObserver } from "./unobserve.js";

export const isIntersecting = (entry) => entry.isIntersecting || entry.intersectionRatio > 0;

const getObserverSettings = (settings) => ({
  root: settings.container === document ? null : settings.container,
  rootMargin: settings.thresholds || settings.threshold + "px"
});

const intersectionHandler = (entries, settings, instance) => {
  entries.forEach((entry) =>
    isIntersecting(entry)
      ? onEnter(entry.target, entry, settings, instance)
      : onExit(entry.target, entry, settings, instance)
  );
};

export const observeElements = (observer, elements) => {
  elements.forEach((element) => {
    observer.observe(element);
  });
};

export const updateObserver = (observer, elementsToObserve) => {
  resetObserver(observer);
  observeElements(observer, elementsToObserve);
};

export const setObserver = (settings, instance) => {
  if (!supportsIntersectionObserver || shouldUseNative(settings)) {
    return;
  }
  instance._observer = new IntersectionObserver((entries) => {
    intersectionHandler(entries, settings, instance);
  }, getObserverSettings(settings));
};
