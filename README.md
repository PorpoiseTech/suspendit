# suspendit

Suspense support for your components

- [suspendit](#suspendit)
  - [How to install](#how-to-install)
  - [Usage](#usage)
    - [Suspend on queries](#suspend-on-queries)
    - [Suspend on a promise](#suspend-on-a-promise)
    - [Doing something when the query resolves](#doing-something-when-the-query-resolves)
    - [Suspend on a lazy loaded component](#suspend-on-a-lazy-loaded-component)
  - [Concepts](#concepts)
    - [Query](#query)

## How to install

This package is available on npm under the name `@porpoisetech/suspendit`. Use your favourite package manager to install:

```
npm install @porpoisetech/suspendit
```

## Usage

### Suspend on queries

[See: Concepts - Query](#query)

Suspend rendering a child component based on a query. The query will be called when the `SuspendIt` component is initially rendered. Data returned by the query will be passed in to the child component as the `data` property.

_query-example.tsx_

```jsx
import { SuspendIt } from "@porpoisetech/suspendit";

const query = () =>
  fetch("https://dog.ceo/api/breeds/image/random").then((response) =>
    response.json()
  );

export const QueryExample = () => {
  return (
    <SuspendIt query={query} fallback={<div>Finding a dog...</div>}>
      {({ data }) => (
        <div>
          <img src={data.message} />
        </div>
      )}
    </SuspendIt>
  );
};
```

### Suspend on a promise

Suspend rendering a child component based on a promise resolving. Data returned by the query will be passed in to the child component as the `data` property. This allows you to manage you own data flows outside of the data handled outside of the promise.

_promise-example.tsx_

```
import { useEffect, useState } from 'react'
import { SuspendIt } from '../suspend-it'

const getRandomPic = (): Promise<{ message: string; status: string }> =>
  fetch('https://dog.ceo/api/breeds/image/random').then((response) =>
    response.json()
  )

export const PromiseExample = () => {
  const [pictures, setPictures] = useState<string[]>([])
  const [wait, setWait] = useState(getRandomPic)

  useEffect(() => {
    wait.then(({ message }) => {
      setPictures([...pictures, message])
    })
  }, [])

  return (
    <>
      <button
        onClick={() => {
          setWait(
            getRandomPic().then((response) => {
              setPictures([...pictures, response.message])
              return response
            })
          )
        }}
      >
        Get another picture
      </button>
      <SuspendIt wait={wait} fallback={<>Getting a new dog picture...</>}>
        {({ data }) => {
          return (
            <div>
              <h3>Latest Picture</h3>
              <img src={data.message} />
            </div>
          )
        }}
      </SuspendIt>
      <h3>History</h3>
      {pictures.length === 0 ? (
        <div>no history yet</div>
      ) : (
        <ul>
          {pictures.slice(1).map((url) => (
            <li key={url}>{url}</li>
          ))}
        </ul>
      )}
    </>
}
```

### Doing something when the query resolves

Sometimes you want to run a callback function for when the promise resolves data. You can do this when a promise is passed in using `query` or `wait`
props using the `onResolve` prop.

### Suspend on a lazy loaded component

Suspend rendering a child component based on its import state. Usage is identical to React `Suspense` component.

_lazy-example.tsx_

```jsx
import { lazy } from "react";
import { SuspendIt } from "@porpoisetech/suspendit";

const LazyLoadedComponent = lazy(() => import("./lazy-load-me"));

export const LazyExample = () => {
  return (
    <SuspendIt fallback="Loading...">
      <LazyLoadedComponent />
    </SuspendIt>
  );
};
```

## Concepts

### Query

A function to be invoked that returns a promise, for example, `fetch`.
