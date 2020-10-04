import { useMemo, useState } from "react";

function useSearch<T, K extends keyof T>(
  target: Array<T>,
  keys: Array<K>,
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
              // console.warn("you tried to search in a non-string property");
              // TODO: implement behavior for numbers
              // + how to make sure only keys for props of type string or number are allowed to be passed?
              return false;
            })
          )
        : target,
    [search, target, keys]
  );

  return { filteredList, search, setSearch };
}
export default useSearch;
