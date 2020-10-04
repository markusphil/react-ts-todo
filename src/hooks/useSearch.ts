import { useMemo, useState } from "react";

type StringValueKeys<T> = {
  [K in keyof T]: T[K] extends string | undefined | null ? K : never;
}[keyof T];

function useSearch<T>(
  target: Array<T>,
  keys: Array<StringValueKeys<T>>,
  initialSearch: string = ""
) {
  const [search, setSearch] = useState<string>(initialSearch);

  const filteredList = useMemo(
    () =>
      search.length > 0
        ? target.filter((t) =>
            keys.some((k) => {
              const value = t[k];
              if (typeof value === "string") return value.includes(search);
              return false;
            })
          )
        : target,
    [search, target, keys]
  );

  return { filteredList, search, setSearch };
}
export default useSearch;
