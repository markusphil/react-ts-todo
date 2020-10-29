import React, { Fragment } from "react";
import useSearch from "../../hooks/useSearch";
import { Category } from "../../types/types";

interface CategoryListProps {
    categories: Category[];
}


function CategoryList({categories}:CategoryListProps){

    const {filteredList, search, setSearch } = useSearch(categories, ["name"]);

    return (
        <Fragment>
            <input value={search} onChange={e => setSearch(e.target.value)}/>
            <ul>{filteredList.map(cat => <li>{cat.name}</li>)}</ul>
        </Fragment>
    )
}

export default CategoryList;