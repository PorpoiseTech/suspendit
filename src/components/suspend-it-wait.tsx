import { Suspense, useEffect, useState } from 'react'
import { EmptyDataValue } from './empty-data-value'
import { SuspendItPromiseProps } from '../model/suspend-it-promise-mode'
import { SuspendItGeneralProps } from '../model/suspend-it-general'
import { SuspendItThrower } from '../suspend-it-thrower'

export type SuspendItWaitProps<Data> = {
  wait: Promise<Data>
} & SuspendItPromiseProps<Data> &
  SuspendItGeneralProps

export function SuspendItWait<Data>({
  children,
  onResolve,
  fallback,
  wait,
}: SuspendItWaitProps<Data>) {
  const [data, setData] = useState<Data | EmptyDataValue>(EmptyDataValue)

  useEffect(() => {
    wait.then((data) => {
      setData(data)

      if (onResolve) {
        onResolve(data)
      }
    })
  }, [wait])

  return (
    <Suspense fallback={fallback}>
      <SuspendItThrower promiseHandle={wait} data={data}>
        {children}
      </SuspendItThrower>
    </Suspense>
  )
}
