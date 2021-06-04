export const checkCache = async (cacheName) => {
  const req = await fetch(`/api/cache/${cacheName}`);
  if (!req.ok) {
    return false;
  }
  const resp = await req.json();
  if (!resp.success) {
    return false;
  }
  // check if localStorage cache exists
  if (!localStorage.getItem(cacheName)) {
    return false;
  }
  // get cache last updated status from server
  const serverLastUpdated = new Date(resp.data.lastUpdated);
  // get local cache last updated status
  const cacheRawLastUpdated = JSON.parse(
    localStorage.getItem(cacheName),
  ).lastUpdated;
  const cacheLastUpdated = new Date(cacheRawLastUpdated);
  // if server cache has not been updated since local cache
  // continue using local cache (i.e. return true)
  return serverLastUpdated < cacheLastUpdated;
};
