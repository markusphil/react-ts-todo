import { useMemo, useState } from "react";

function useSearch<T, K extends keyof T>(
  target: Array<T>,
  keys: Array<K>,
  initialSearch: string = ""
) {
  const [search, setSearch] = useState<string>(initialSearch);

  const filteredList = useMemo(
    () =>
      target.filter((t) =>
        keys.some((k) => {
          const value = t[k];
          if (typeof value === "string") return value.includes(search);
          return false;
        })
      ),
    [search, target, keys]
  );

  return { filteredList, search, setSearch };
}
export default useSearch;
