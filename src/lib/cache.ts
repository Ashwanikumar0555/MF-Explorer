type CacheStore = Record<string, any>;
const cache: CacheStore = {};

export function getCache(key: string) {
  return cache[key] || null;
}

export function setCache(key: string, value: any) {
  cache[key] = value;
}
