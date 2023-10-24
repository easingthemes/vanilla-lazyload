import expectExtend from "./lib/expectExtend.js";
import getFakeInstance from "./lib/getFakeInstance.js";

import { load } from "../load.js";
import { getExtendedSettings } from "../defaults.js";
import { getStatus } from "../data.js";
import { statusLoading } from "../elementStatus.js";

expectExtend(expect);

var outerDiv, settings, instance;

beforeEach(() => {
  outerDiv = document.createElement("div");
  settings = getExtendedSettings();
  instance = getFakeInstance();
});

afterEach(() => {
  outerDiv = null;
  settings = null;
  instance = null;
});

describe("load...", () => {
  let img;

  beforeEach(() => {
    outerDiv.appendChild((img = document.createElement("img")));
  });

  afterEach(() => {
    outerDiv.removeChild(img);
    img = null;
  });

  test("status is set", () => {
    load(img, {});
    const status = getStatus(img);
    expect(status).toBe(statusLoading);
  });

  test("callbacks are called", () => {
    const loadingCb = jest.fn();
    settings.callback_loading = loadingCb;
    load(img, settings, instance);
    expect(loadingCb).toHaveBeenCalledTimes(1);
    expect(loadingCb).toHaveBeenCalledWith(img, instance);
  });
});
