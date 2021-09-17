import { ActionUnion } from '../types/helpers';
import React, { createContext, ReactNode, useReducer } from "react";

interface Filter {
    categoryIds: number[]
}

type FilterActionPayloads = {
    "RESET": null;
    "SET_CATEGORIES": number[]
}

type FilterActions = ActionUnion<FilterActionPayloads>

type FilterContextType = { activeFilters: Filter; dispatchFilter: (action: FilterActions) => void }

const defaultFilter: Filter = {
    categoryIds: []
}

function filterReducer(state: Filter, action: FilterActions): Filter {
    switch (action.type) {
        case "RESET":
            return defaultFilter
        case "SET_CATEGORIES":
            return { ...state, categoryIds: action.payload }
    }
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

export function FilterContextProvider({ children }: { children: ReactNode }) {
    const [activeFilters, dispatchFilter] = useReducer(filterReducer, defaultFilter)
    return (
        <FilterContext.Provider value={{ activeFilters, dispatchFilter }} >
            {children}
        </FilterContext.Provider>
    )
}

export function useFilterContext() {
    const context = React.useContext(FilterContext)
    if (context === undefined) {
        throw new Error('useFilter must be used within a FilterProvider')
    }
    return context
}

