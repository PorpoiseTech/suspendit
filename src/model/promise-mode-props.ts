import { FC } from 'react'
import { GeneralProps } from './general-props.ts'

export type WaitProps<Data> = {
  wait: Promise<Data>
} & PromiseModeProps<Data> &
  GeneralProps

export type QueryProps<Data> = {
  query: () => Promise<Data>
} & PromiseModeProps<Data> &
  GeneralProps

export type PromiseChildProps<Data> = { data: Data }

/**
 * Promise mode
 * When the thing to be suspended against is passed in explicitly as:
 * - a promise
 * - a thunk that returns a promise
 */
export type PromiseModeProps<Data> = {
  children?: FC<PromiseChildProps<Data>>
  onResolve?: (data: Data) => void
}

export type PromiseModeComponentProps<Data> = {
  wait: Promise<Data> | (() => Promise<Data>)
} & PromiseModeProps<Data> &
  GeneralProps
