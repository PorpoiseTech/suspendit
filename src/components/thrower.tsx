import { FC, ReactNode } from 'react'
import { EmptyDataValue } from '../model/empty-data-value.ts'
import { PromiseChildProps } from '../model/promise-mode-props.ts'

export type ThrowerProps<Data> = {
  promiseHandle: Promise<Data>
  data: Data | EmptyDataValue
  children?: FC<PromiseChildProps<Data>>
}

export function Thrower<Data>({
  promiseHandle,
  data,
  children,
}: ThrowerProps<Data>): ReactNode {
  if (data === EmptyDataValue) {
    throw promiseHandle
  }

  return <>{children && children({ data })}</>
}
