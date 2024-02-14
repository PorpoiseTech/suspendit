import { ReactNode, Suspense, useMemo } from "react";
import { SuspendItGeneralProps } from "../model/suspend-it-general";
import { SuspendItPromiseMode } from "./suspend-it-promise-mode";
import {
  SuspendItQueryProps,
  SuspendItWaitProps,
} from "../model/suspend-it-promise-mode";
import { nanoid } from "nanoid";

export type SuspendItProps<Data> = SuspendItGeneralProps &
  (
    | SuspendItQueryProps<Data>
    | SuspendItWaitProps<Data>
    | { children?: ReactNode }
  );

export function SuspendIt<Data>(props: SuspendItQueryProps<Data>): ReactNode;
export function SuspendIt<Data>(props: SuspendItWaitProps<Data>): ReactNode;
export function SuspendIt(
  props: SuspendItGeneralProps & { children?: ReactNode }
): ReactNode;
export function SuspendIt(): ReactNode;

export function SuspendIt<Data>({
  fallback,
  ...props
}: SuspendItProps<Data> = {}): ReactNode {
  if ((props && "query" in props) || "wait" in props) {
    const wait = "query" in props ? props.query : props.wait;
    const waitKey = useMemo(nanoid, [wait]);

    return (
      <SuspendItPromiseMode
        wait={wait}
        key={waitKey}
        onResolve={props.onResolve}
        fallback={fallback}
      >
        {props.children}
      </SuspendItPromiseMode>
    );
  } else {
    return <Suspense fallback={fallback}>{props.children}</Suspense>;
  }
}
