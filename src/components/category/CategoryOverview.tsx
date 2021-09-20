import React, { Fragment, useEffect, useState } from "react";
import { apiService } from "../../services/mockedApiService";
import CategoryList from "./CategoryList";
import { useFilterContext } from "../../context/FilterContext";
import { useCategoryContext } from "../../context/CategoryContext";


// concern: handle API connection and changes to category data

/*
 TODO:
 - add or delete category
 - select default category
*/

function CategoryOverview() {
  const [isLoading, setIsLoading] = useState(false);
  const {categories, dispatchCategories} = useCategoryContext()
  const { activeFilters, dispatchFilter } = useFilterContext()

  function fetchCategories() {
    console.log("fetch categories")
    return apiService.get("category").then(res => {
      dispatchCategories({
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
      <h2>Categories</h2>
      {isLoading ? (
        <div>...loading</div>
      ) : (
        <CategoryList categories={categories} activeCategoryFilters={activeFilters.categoryIds} updateCategoryFilter={updateFilter} />
      )}

    </Fragment>
  );
}

export default CategoryOverview;
