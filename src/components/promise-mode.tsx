import { Suspense, useEffect, useState } from 'react'
import { EmptyDataValue } from '../model/empty-data-value.ts'
import { PromiseModeComponentProps } from '../model/promise-mode-props.ts'
import { Thrower } from './thrower.tsx'

export function PromiseMode<Data>({
  fallback,
  onResolve,
  wait,
  children,
}: PromiseModeComponentProps<Data>) {
  const [data, setData] = useState<Data | EmptyDataValue>(EmptyDataValue)
  const [promiseHandle] = useState(wait)

  useEffect(() => {
    promiseHandle.then((data) => {
      setData(data)

      if (onResolve) {
        onResolve(data)
      }
    })
  }, [promiseHandle])

  return (
    <Suspense fallback={fallback}>
      <Thrower promiseHandle={promiseHandle} data={data}>
        {children}
      </Thrower>
    </Suspense>
  )
}
