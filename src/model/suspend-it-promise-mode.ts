import { FC } from "react";
import { SuspendItGeneralProps } from "./suspend-it-general";

export type SuspendItWaitProps<Data> = {
  wait: Promise<Data>;
} & SuspendItPromiseProps<Data> &
  SuspendItGeneralProps;

export type SuspendItQueryProps<Data> = {
  query: () => Promise<Data>;
} & SuspendItPromiseProps<Data> &
  SuspendItGeneralProps;

/**
 * Promise mode
 * When the thing to be suspended against is passed in explicitly as:
 * - a promise
 * - a thunk that returns a promise
 */
export type SuspendItPromiseProps<Data> = {
  children?: FC<SuspendItPromiseChildProps<Data>>;
  onResolve?: (data: Data) => void;
};

export type SuspendItPromiseChildProps<Data> = { data: Data };
