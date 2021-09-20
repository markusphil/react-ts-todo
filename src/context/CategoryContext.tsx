import { ActionUnion } from '../types/helpers';
import React, { createContext, ReactNode, useReducer } from "react";
import { Category } from '../types/types';
import { defaultCat } from '../fixtures/categoryFixtures';

type CategoryActionPayloads = {
  "ADD_CATEGORY": Category;
  "ADD_CATEGORY_LIST": Category[];
  "REMOVE_CATEGORY": { id: number };
  "UPDATE_CATEGORY": Category;
  "REPLACE_CATEGORY_LIST": Category[];
};

type CategoryAction = ActionUnion<CategoryActionPayloads>;

function categoryReducer(state: Category[], action: CategoryAction): Category[] {
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


type CategoryContextType = { 
  categories: Category[],
  defaultCategory: Category,
  dispatchCategories: (action: CategoryAction) => void }


const CatContext = createContext<CategoryContextType | undefined>(undefined)

export function CategoryContextProvider({ children }: { children: ReactNode }) {
    const [categories, dispatchCategories] = useReducer(categoryReducer, [])
    const value: CategoryContextType = {
      categories: categories,
      defaultCategory: defaultCat,
      dispatchCategories
    } 

    return (
        <CatContext.Provider value={value} >
            {children}
        </CatContext.Provider>
    )
}

export function useCategoryContext() {
    const context = React.useContext(CatContext)
    if (context === undefined) {
        throw new Error('useCategoryContext must be used within a CategoryContextProvider')
    }
    return context
}

