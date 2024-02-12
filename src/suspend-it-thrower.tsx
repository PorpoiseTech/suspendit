import { FC, ReactNode } from "react";
import { EmptyDataValue } from "./components/empty-data-value";
import { SuspendItPromiseChildProps } from "./model/suspend-it-promise-mode";

export type SuspendItThrowerProps<Data> = {
  promiseHandle: Promise<Data>;
  data: Data | EmptyDataValue;
  children?: FC<SuspendItPromiseChildProps<Data>>;
};

export function SuspendItThrower<Data>({
  promiseHandle,
  data,
  children,
}: SuspendItThrowerProps<Data>): ReactNode {
  if (data === EmptyDataValue) {
    throw promiseHandle;
  }

  return <>{children && children({ data })}</>;
}
