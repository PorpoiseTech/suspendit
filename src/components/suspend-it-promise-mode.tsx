import { Suspense, useEffect, useRef, useState } from "react";
import { EmptyDataValue } from "../model/empty-data-value";
import { SuspendItPromiseProps } from "../model/suspend-it-promise-mode";
import { SuspendItGeneralProps } from "../model/suspend-it-general";
import { SuspendItThrower } from "../suspend-it-thrower";

export type SuspendItPromiseModeProps<Data> = {
  wait: Promise<Data> | (() => Promise<Data>);
} & SuspendItPromiseProps<Data> &
  SuspendItGeneralProps;

export function SuspendItPromiseMode<Data>({
  children,
  onResolve,
  fallback,
  wait,
}: SuspendItPromiseModeProps<Data>) {
  const [data, setData] = useState<Data | EmptyDataValue>(EmptyDataValue);
  const [promiseHandle] = useState(wait);

  useEffect(() => {
    promiseHandle.then((data) => {
      setData(data);

      if (onResolve) {
        onResolve(data);
      }
    });
  }, [promiseHandle]);

  return (
    <Suspense fallback={fallback}>
      <SuspendItThrower promiseHandle={promiseHandle} data={data}>
        {children}
      </SuspendItThrower>
    </Suspense>
  );
}
