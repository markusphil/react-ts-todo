import { act, renderHook } from "@testing-library/react-hooks"
import useCounter from "../../hooks/useCounter"

test("positive Values, no default", ()=>{
    const {result} = renderHook(()=>useCounter());
    const [count, increment, decrement] = result.current
    expect(count).toEqual(0);
    act(()=>increment());
    expect(result.current[0]).toEqual(1);
    act(()=>increment());
    expect(result.current[0]).toEqual(2);
    act(()=>decrement());
    expect(result.current[0]).toEqual(1);
})

test("negative Values, default = 2", ()=>{
    const {result} = renderHook(()=>useCounter(2));
    const [count, increment, decrement] = result.current
    expect(count).toEqual(2);
    act(()=>decrement());
    expect(result.current[0]).toEqual(1);
    act(()=>decrement());
    act(()=>decrement());
    expect(result.current[0]).toEqual(-1);
    act(()=>decrement());
    expect(result.current[0]).toEqual(-2);
    act(()=>increment());
    expect(result.current[0]).toEqual(-1);
})