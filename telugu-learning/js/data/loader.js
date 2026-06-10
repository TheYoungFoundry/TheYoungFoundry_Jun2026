const cache = {};

// Resolve data path relative to this module file (js/data/loader.js → ../../data/)
// This works regardless of how the app is served or what the page URL is.
const DATA_BASE = new URL('../../data/', import.meta.url).href;

export async function loadData(name) {
  if (cache[name]) return cache[name];
  const r = await fetch(`${DATA_BASE}${name}.json`);
  if (!r.ok) throw new Error(`Failed to load data/${name}.json — HTTP ${r.status}`);
  cache[name] = await r.json();
  return cache[name];
}

export function clearCache(name) {
  if (name) delete cache[name];
  else Object.keys(cache).forEach(k => delete cache[k]);
}
