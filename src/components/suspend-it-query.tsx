import { SuspendItPromiseProps } from '../model/suspend-it-promise-mode'
import { SuspendItGeneralProps } from '../model/suspend-it-general'
import { Suspense, useEffect, useState } from 'react'
import { EmptyDataValue } from './empty-data-value'
import { SuspendItThrower } from '../suspend-it-thrower'

export type SuspendItQueryProps<Data> = {
  query: () => Promise<Data>
} & SuspendItPromiseProps<Data> &
  SuspendItGeneralProps

export function SuspendItQuery<Data>({
  children,
  fallback,
  onResolve,
  query,
}: SuspendItQueryProps<Data>) {
  const [data, setData] = useState<Data | EmptyDataValue>(EmptyDataValue)
  const [promiseHandle] = useState(query())

  useEffect(() => {
    promiseHandle.then((data) => {
      setData(data)

      if (onResolve) {
        onResolve(data)
      }
    })
  }, [query])

  return (
    <Suspense fallback={fallback}>
      <SuspendItThrower promiseHandle={promiseHandle} data={data}>
        {children}
      </SuspendItThrower>
    </Suspense>
  )
}
