import { FC } from "react";

export type SuspendItPromiseProps<Data> = {
  children?: FC<SuspendItPromiseChildProps<Data>>;
  onResolve?: (data: Data) => void;
};

export type SuspendItPromiseChildProps<Data> = { data: Data };
