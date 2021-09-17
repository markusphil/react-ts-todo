import React, { Fragment } from "react";
import useSearch from "../../hooks/useSearch";
import { Category } from "../../types/types";
import CategoryListEntry from "./CategoryListEntry";

interface CategoryListProps {
    categories: Category[];
    activeCategoryFilters: number[];
    updateCategoryFilter: (catIds: number[]) => void;
}


function CategoryList({ categories, activeCategoryFilters, updateCategoryFilter }: CategoryListProps) {

    const { filteredList, search, setSearch } = useSearch(categories, ["name"]);

    function toggleCategory(id: number) {
        updateCategoryFilter(activeCategoryFilters.includes(id)
            ? activeCategoryFilters.filter(catId => catId !== id)
            : [...activeCategoryFilters, id])
    }

    return (
        <Fragment>
            <input value={search} onChange={e => setSearch(e.target.value)} />
            <ul>
                {filteredList.map(cat =>
                    <CategoryListEntry {...cat} key={cat.id} selectionHandler={toggleCategory} />
                )}
            </ul>
        </Fragment>
    )
}

export default CategoryList;