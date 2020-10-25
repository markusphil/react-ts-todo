import { useReducer } from 'react';

enum Actions {
    Increment = "INCREMENT",
    Decrement = "DECREMENT"
}

function counterReducer(state: number, action: Actions):number{
    switch(action){
        case Actions.Increment:
            return state + 1;
        case Actions.Decrement:
            return state - 1;
    }
}

function useCounter(initialValue = 0){

    const [count, dispatch] = useReducer(counterReducer, initialValue);

    const increment = ()=> dispatch(Actions.Increment);
    const decrement = ()=> dispatch(Actions.Decrement);
    
    return [count, increment, decrement] as const
}

export default useCounter