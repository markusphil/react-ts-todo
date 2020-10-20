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

export type RouteMap<R extends { [index: string]: any }> = {
  [Key in keyof R]: R[Key]
}

export type RouteUnion<R> = RouteMap<R>[keyof RouteMap<R>]