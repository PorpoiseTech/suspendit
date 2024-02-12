import { FC } from "react";

export type SuspendItQuery<Data> = {
  query: () => Promise<Data>;
};

export type SuspendItWait<Data> = {
  wait: Promise<Data>;
};

/**
 * Promise to be suspended against is passed in explicitly as a promise instance, or as a thunk that returns a promise.
 */
export type SuspendItPromiseMode<Data> =
  | SuspendItQuery<Data>
  | SuspendItWait<Data>;

export type SuspendItPromiseChildProps<Data> = { data: Data };

export type SuspendItPromise<Data> = {
  children?: FC<SuspendItPromiseChildProps<Data>>;
  onResolve?: (data: Data) => void;
};
