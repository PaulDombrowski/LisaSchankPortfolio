export function withBase(path = '/') {
  if (!path) {
    return import.meta.env.BASE_URL;
  }

  if (/^(https?:|mailto:|tel:|#)/.test(path)) {
    return path;
  }

  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = String(path).replace(/^\/+/, '');

  return `${cleanBase}${cleanPath}`;
}
