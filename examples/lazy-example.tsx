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
