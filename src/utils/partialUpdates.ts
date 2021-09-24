import { ValueUnion } from './../types/helpers';

export function partialUpdate<T>(target: T, key: keyof T, value: ValueUnion<T>):T { 
  return {...target, [key]: value}
}