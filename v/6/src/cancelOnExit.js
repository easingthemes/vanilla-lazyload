import { removeEventListeners } from "./event.js";
import { resetSourcesImg } from "./reset.js";
import { restoreImg } from "./restore.js";
import { safeCallback } from "./callback.js";
import { removeClass } from "./class.js";
import { updateLoadingCount } from "./counters.js";
import { hasStatusLoading, resetStatus } from "./data.js";

export const cancelLoading = (element, entry, settings, instance) => {
  if (!settings.cancel_on_exit) return;
  if (!hasStatusLoading(element)) return;
  if (element.tagName !== "IMG") return; //Works only on images
  removeEventListeners(element);
  resetSourcesImg(element);
  restoreImg(element);
  removeClass(element, settings.class_loading);
  updateLoadingCount(instance, -1);
  resetStatus(element);
  safeCallback(settings.callback_cancel, element, entry, instance);
};
