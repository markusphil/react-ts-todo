export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type ActionUnion<M> = ActionMap<M>[keyof ActionMap<M>];

export type GenericMap<M extends { [index: string]: any}> = {
  [Key in keyof M]: M[Key]
}

export type ValueUnion<T> = GenericMap<T>[keyof GenericMap<T>]

export type PartialUpdateArguments<T> = (target: T, key: keyof T, value: ValueUnion<T>) => T

