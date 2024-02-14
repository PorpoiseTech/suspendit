import { ReactNode, Suspense, useMemo } from 'react'
import { nanoid } from 'nanoid'
import { GeneralProps } from '../model/general-props.ts'
import {
  PromiseModeProps,
  QueryProps,
  WaitProps,
} from '../model/promise-mode-props.ts'
import { PromiseMode } from './promise-mode.tsx'

export type SuspendItProps<Data> = GeneralProps &
  (QueryProps<Data> | WaitProps<Data> | { children?: ReactNode })

export function SuspendIt<Data>(props: QueryProps<Data>): ReactNode
export function SuspendIt<Data>(props: WaitProps<Data>): ReactNode
export function SuspendIt(
  props: GeneralProps & { children?: ReactNode }
): ReactNode
export function SuspendIt(): ReactNode

export function SuspendIt<Data>({
  fallback,
  ...props
}: SuspendItProps<Data> = {}): ReactNode {
  const { wait, props: inferredProps } = getWaitFromProps(props)
  const waitKey = useMemo(nanoid, [wait])

  if (wait) {
    return (
      <PromiseMode
        wait={wait}
        key={waitKey}
        onResolve={inferredProps.onResolve}
        fallback={fallback}
      >
        {inferredProps.children}
      </PromiseMode>
    )
  } else {
    return <Suspense fallback={fallback}>{inferredProps.children}</Suspense>
  }
}

/**
 * return type includes props to help typescript type inference during control flow
 */
function getWaitFromProps<Data>(props: SuspendItProps<Data>):
  | {
      wait: WaitProps<Data>['wait'] | QueryProps<Data>['query']
      props: PromiseModeProps<Data>
    }
  | { wait: false; props: GeneralProps & { children?: ReactNode } } {
  if ('query' in props) {
    return {
      wait: props.query,
      props,
    }
  } else if ('wait' in props) {
    return {
      wait: props.wait,
      props,
    }
  }

  return {
    wait: false,
    props,
  }
}
