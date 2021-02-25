const buildQuery = function (url: string, params: Record<string, string | number>) {
  const built = new URL(url);

  Object.entries(params)
    .forEach(
      ([key, value]) => value && built.searchParams.set(key, value.toString())
    );

  return built;
}

export default {
  buildQuery,
}
