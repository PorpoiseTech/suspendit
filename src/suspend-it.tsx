import { ComponentType, ReactNode, Suspense, useEffect, useState } from "react";
import {
  SuspendItPromise,
  SuspendItQuery,
  SuspendItWait,
} from "./suspend-it-promise-mode";
import { EmptyDataValue } from "./empty-data-value";
import { SuspendItThrower } from "./suspend-it-thrower";

export type SuspendItProps = {
  fallback?: ReactNode;
};

export function SuspendIt<Data>(
  props: SuspendItQuery<Data> & SuspendItPromise<Data> & SuspendItProps
): ReactNode;
export function SuspendIt<Data>(
  props: SuspendItWait<Data> & SuspendItPromise<Data> & SuspendItProps
): ReactNode;
export function SuspendIt(
  props: SuspendItProps & { children?: ReactNode }
): ReactNode;
export function SuspendIt(): ReactNode;

export function SuspendIt<Data>({
  fallback,
  ...props
}: SuspendItProps &
  SuspendItPromise<Data> &
  (
    | SuspendItQuery<Data>
    | SuspendItWait<Data>
    | { children?: ReactNode }
  ) = {}) {
  if (props && "query" in props) {
    return (
      <SuspendItQuery
        query={props.query}
        onResolve={props.onResolve}
        fallback={fallback}
      >
        {props.children}
      </SuspendItQuery>
    );
  } else if (props && "wait" in props) {
    return (
      <SuspendItWait
        wait={props.wait}
        onResolve={props.onResolve}
        fallback={fallback}
      >
        {props.children}
      </SuspendItWait>
    );
  } else {
    return <Suspense fallback={fallback}>{props.children}</Suspense>;
  }
}

export type SuspendItPromiseProps<Data> = {
  data: Data | EmptyDataValue;
};

export type SuspendItQueryProps<Data> = SuspendItQuery<Data> &
  SuspendItPromise<Data> &
  SuspendItProps;

export function SuspendItQuery<Data>({
  children,
  fallback,
  onResolve,
  query,
}: SuspendItQueryProps<Data>) {
  const [data, setData] = useState<Data | EmptyDataValue>(EmptyDataValue);
  const [promiseHandle] = useState(query());

  useEffect(() => {
    promiseHandle.then((data) => {
      setData(data);

      if (onResolve) {
        onResolve(data);
      }
    });
  }, [query]);

  return (
    <Suspense fallback={fallback}>
      <SuspendItThrower promiseHandle={promiseHandle} data={data}>
        {children}
      </SuspendItThrower>
    </Suspense>
  );
}

export type SuspendItWaitProps<Data> = SuspendItWait<Data> &
  SuspendItPromise<Data> &
  SuspendItProps;

export function SuspendItWait<Data>({
  children,
  onResolve,
  fallback,
  wait,
}: SuspendItWaitProps<Data>) {
  const [data, setData] = useState<Data | EmptyDataValue>(EmptyDataValue);

  useEffect(() => {
    wait.then((data) => {
      setData(data);

      if (onResolve) {
        onResolve(data);
      }
    });
  }, [wait]);

  return (
    <Suspense fallback={fallback}>
      <SuspendItThrower promiseHandle={wait} data={data}>
        {children}
      </SuspendItThrower>
    </Suspense>
  );
}
