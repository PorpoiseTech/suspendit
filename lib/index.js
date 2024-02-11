"use strict";
import { Fragment, jsx } from "react/jsx-runtime";
import {
  Suspense,
  useEffect,
  useState
} from "react";
const EmptyDataValue = Symbol("EmptyDataValue");
export function SuspendIt({
  fallback,
  children,
  ...props
}) {
  const [data, setData] = useState(EmptyDataValue);
  const [promiseHandle] = useState(
    "query" in props ? props.query() : props.wait
  );
  useEffect(() => {
    promiseHandle.then(setData);
  }, []);
  return /* @__PURE__ */ jsx(Suspense, { fallback, children: /* @__PURE__ */ jsx(SuspendItThrower, { promiseHandle, data, children }) });
}
export function SuspendItThrower({
  promiseHandle,
  data,
  children
}) {
  if (data === EmptyDataValue) {
    throw promiseHandle;
  }
  return /* @__PURE__ */ jsx(Fragment, { children: children && children({ data }) });
}
