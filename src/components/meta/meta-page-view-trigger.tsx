"use client";

import React from "react";
import { metaPageView } from "~/server/pixel/meta";

export function MetaPageViewTrigger({ children }: { children: React.ReactNode }) {

  React.useEffect(() => {
    const triggerPageView = async () => {
      try {
        const result = await metaPageView();
        console.log(result);
      } catch (error) {
        console.error("Error triggering Meta PageView:", error);
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    triggerPageView();
  }, []);

  return <>{children}</>;
}