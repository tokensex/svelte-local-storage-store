// index.ts
import { writable as internal, get } from "svelte/store";
var stores = {};
function writable(key, initialValue) {
  const browser = typeof localStorage != "undefined";
  function updateStorage(key2, value) {
    if (!browser)
      return;
    localStorage.setItem(key2, JSON.stringify(value));
  }
  if (!stores[key]) {
    const store = internal(initialValue, (set2) => {
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
        const value = updater(get(store));
        updateStorage(key, value);
        set(value);
      },
      subscribe
    };
  }
  return stores[key];
}
export {
  writable
};
//# sourceMappingURL=index.mjs.map