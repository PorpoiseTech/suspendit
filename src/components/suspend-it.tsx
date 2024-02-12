import { ReactNode, Suspense } from 'react'
import { SuspendItWaitProps, SuspendItWait } from './suspend-it-wait'
import { SuspendItGeneralProps } from '../model/suspend-it-general'
import { SuspendItQuery, SuspendItQueryProps } from './suspend-it-query'

export type SuspendItProps<Data> = SuspendItGeneralProps &
  (
    | SuspendItQueryProps<Data>
    | SuspendItWaitProps<Data>
    | { children?: ReactNode }
  )

export function SuspendIt<Data>(props: SuspendItQueryProps<Data>): ReactNode
export function SuspendIt<Data>(props: SuspendItWaitProps<Data>): ReactNode
export function SuspendIt(
  props: SuspendItGeneralProps & { children?: ReactNode }
): ReactNode
export function SuspendIt(): ReactNode

export function SuspendIt<Data>({
  fallback,
  ...props
}: SuspendItProps<Data> = {}): ReactNode {
  if (props && 'query' in props) {
    return (
      <SuspendItQuery
        query={props.query}
        onResolve={props.onResolve}
        fallback={fallback}
      >
        {props.children}
      </SuspendItQuery>
    )
  } else if (props && 'wait' in props) {
    return (
      <SuspendItWait
        wait={props.wait}
        onResolve={props.onResolve}
        fallback={fallback}
      >
        {props.children}
      </SuspendItWait>
    )
  } else {
    return <Suspense fallback={fallback}>{props.children}</Suspense>
  }
}
