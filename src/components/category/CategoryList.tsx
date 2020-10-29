import React, { Fragment } from "react";
import useSearch from "../../hooks/useSearch";
import { Category } from "../../types/types";
import CategoryListEntry from "./CategoryListEntry";

interface CategoryListProps {
    categories: Category[];
}


function CategoryList({categories}:CategoryListProps){

    const {filteredList, search, setSearch } = useSearch(categories, ["name"]);

    return (
        <Fragment>
            <input value={search} onChange={e => setSearch(e.target.value)}/>
            <ul>{filteredList.map(cat => <CategoryListEntry {...cat} key={cat.id} selectionHandler={ id => console.log(id)}/>)}</ul>
        </Fragment>
    )
}

export default CategoryList;