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

  function updateFilter(catIds: number[]) {
    dispatchFilter({ type: "SET_CATEGORIES", payload: catIds })
  }

  useEffect(() => {
    function fetchCategories() {
      console.log("fetch categories")
      return apiService.get("category").then(res => {
        dispatchCategories({
          type: "REPLACE_CATEGORY_LIST",
          payload: res,
        });
      })
    }

    // load initial categories
    setIsLoading(true);
    fetchCategories().then(() => setIsLoading(false));
    // sync all 5 minutes
    setInterval(fetchCategories, 5 * 60 * 1000);
  }, [dispatchCategories]);

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
