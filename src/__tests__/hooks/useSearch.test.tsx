import { act, renderHook } from "@testing-library/react-hooks";
import useSearch from "../../hooks/useSearch";

const mockedList: MockedListItem[] = [
  {
    noString: 138,
    string: "test134",
  },
  {
    noString: 134,
    string: "testaabb",
  },
];

interface MockedListItem {
  noString: any;
  string: string;
}

test("valid Search", () => {
  const { result } = renderHook(() => useSearch(mockedList, ["string"]));
  expect(result.current.filteredList).toEqual(mockedList);
  act(() => result.current.setSearch("134"));
  expect(result.current.filteredList).toHaveLength(1);
  act(() => result.current.setSearch("1348"));
  expect(result.current.filteredList).toHaveLength(0);
  act(() => result.current.setSearch("test"));
  expect(result.current.filteredList).toEqual(mockedList);
});

test("invalid Search", () => {
  const { result } = renderHook(() => useSearch(mockedList, ["noString"]));
  expect(result.current.filteredList).toEqual(mockedList);
  act(() => result.current.setSearch("134"));
  expect(result.current.filteredList).toEqual([]);
});
