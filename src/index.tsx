import {
  Suspense,
  useEffect,
  useState,
  type FC,
  type ReactNode,
  type ComponentType,
} from "react";

export type SuspendItProps<Data> = {
  fallback?: ReactNode;
  children?: FC<{ data: Data }>;
} & (SuspendItQuery<Data> | SuspendItWait<Data>);

export type SuspendItQuery<Data> = {
  query: () => Promise<Data>;
};

export type SuspendItWait<Data> = {
  wait: Promise<Data>;
};

const EmptyDataValue = Symbol("EmptyDataValue");

type EmptyDataValue = typeof EmptyDataValue;

export function SuspendIt<Data>({
  fallback,
  children,
  ...props
}: SuspendItProps<Data>) {
  const [data, setData] = useState<EmptyDataValue | Data>(EmptyDataValue);
  const [promiseHandle] = useState(
    "query" in props ? props.query() : props.wait
  );

  useEffect(() => {
    promiseHandle.then(setData);
  }, []);

  return (
    <Suspense fallback={fallback}>
      <SuspendItThrower promiseHandle={promiseHandle} data={data}>
        {children}
      </SuspendItThrower>
    </Suspense>
  );
}

export type SuspendItThrowerProps<Data> = {
  promiseHandle: Promise<Data>;
  data: Data | EmptyDataValue;
  children?: FC<{ data: Data }>;
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
