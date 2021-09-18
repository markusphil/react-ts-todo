import React, { Fragment, useEffect, useReducer, useState } from "react";
import { Category } from "../../types/types";
import { ActionUnion } from "../../types/helpers";
import { apiService } from "../../services/mockedApiService";
import CategoryList from "./CategoryList";
import { useFilterContext } from "../../context/FilterContext";


// concern: handle API connection and changes to task data

type CategoryActionPayloads = {
  "ADD_CATEGORY": Category;
  "ADD_CATEGORY_LIST": Category[];
  "REMOVE_CATEGORY": { id: number };
  "UPDATE_CATEGORY": Category;
  "REPLACE_CATEGORY_LIST": Category[];
};

type CategoryActions = ActionUnion<CategoryActionPayloads>;

function categoryReducer(state: Category[], action: CategoryActions): Category[] {
  switch (action.type) {
    case "ADD_CATEGORY":
      return [...state, action.payload];
    case "ADD_CATEGORY_LIST" :
      return [...state, ...action.payload];
    case "REMOVE_CATEGORY":
      return state.filter((c) => c.id !== action.payload.id);
    case "UPDATE_CATEGORY":
      return state.map((c) =>
        c.id === action.payload.id ? action.payload : c
      );
    case "REPLACE_CATEGORY_LIST":
      return action.payload
  }
}

function CategoryOverview() {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, dispatch] = useReducer(categoryReducer, []);
  const { activeFilters, dispatchFilter } = useFilterContext()

  function fetchCategories() {
    console.log("fetch categories")
    return apiService.get("category").then(res => {
      dispatch({
        type: "REPLACE_CATEGORY_LIST",
        payload: res,
      });
    })
  }

  function updateFilter(catIds: number[]) {
    dispatchFilter({ type: "SET_CATEGORIES", payload: catIds })
  }

  useEffect(() => {
    setIsLoading(true);
    fetchCategories().then(() => setIsLoading(false));
    setInterval(fetchCategories, 10 * 1000);
  }, []);

  return (
    <Fragment>
      {isLoading ? (
        <div>...loading</div>
      ) : (
        <CategoryList categories={categories} activeCategoryFilters={activeFilters.categoryIds} updateCategoryFilter={updateFilter} />
      )}

    </Fragment>
  );
}

export default CategoryOverview;
