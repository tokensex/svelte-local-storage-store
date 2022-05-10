var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// index.ts
var svelte_local_storage_store_exports = {};
__export(svelte_local_storage_store_exports, {
  writable: () => writable
});
module.exports = __toCommonJS(svelte_local_storage_store_exports);
var import_store = require("svelte/store");
var stores = {};
function writable(key, initialValue) {
  const browser = typeof localStorage != "undefined";
  function updateStorage(key2, value) {
    if (!browser)
      return;
    localStorage.setItem(key2, JSON.stringify(value));
  }
  if (!stores[key]) {
    const store = (0, import_store.writable)(initialValue, (set2) => {
      const json = browser ? localStorage.getItem(key) : null;
      if (browser) {
        json ? localStorage.setItem(key, json) : localStorage.setItem(key, JSON.stringify(initialValue));
      }
      if (json) {
        set2(JSON.parse(json));
      }
      if (browser) {
        const handleStorage = (event) => {
          if (event.key === key)
            set2(event.newValue ? JSON.parse(event.newValue) : null);
        };
        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
      }
    });
    const { subscribe, set } = store;
    stores[key] = {
      set(value) {
        updateStorage(key, value);
        set(value);
      },
      update(updater) {
        const value = updater((0, import_store.get)(store));
        updateStorage(key, value);
        set(value);
      },
      subscribe
    };
  }
  return stores[key];
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  writable
});
//# sourceMappingURL=index.js.map