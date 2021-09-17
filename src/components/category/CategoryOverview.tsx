import React, { Fragment, useContext, useEffect, useReducer, useState } from "react";
import { Category } from "../../types/types";
import { ActionUnion } from "../../types/helpers";
import { apiService } from "../../services/mockedApiService";
import CategoryList from "./CategoryList";
import { useFilterContext } from "../../context/FilterContext";


// concern: handle API connection and changes to task data

enum Actions {
  Add = "ADD_CATEGORY",
  AddList = "ADD_CATEGORY_LIST",
  Remove = "REMOVE_CATEGORY",
  Update = "UPDATE_CATEGORY",
  Refresh = "REPLACE_CATEGORY_LIST"
}

type CategoryActionPayloads = {
  [Actions.Add]: Category;
  [Actions.AddList]: Category[];
  [Actions.Remove]: { id: number };
  [Actions.Update]: Category;
  [Actions.Refresh]: Category[];
};

type CategoryActions = ActionUnion<CategoryActionPayloads>;

function categoryReducer(state: Category[], action: CategoryActions): Category[] {
  switch (action.type) {
    case Actions.Add:
      return [...state, action.payload];
    case Actions.AddList:
      return [...state, ...action.payload];
    case Actions.Remove:
      return state.filter((c) => c.id !== action.payload.id);
    case Actions.Update:
      return state.map((c) =>
        c.id === action.payload.id ? action.payload : c
      );
    case Actions.Refresh:
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
        type: Actions.Refresh,
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
