export const routeHref = (path: string) => {
  if (/^(?:https?:|mailto:|tel:|#)/i.test(path)) return path;

  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (path === '/') return `${base}/`;

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalizedPath}`;
};
