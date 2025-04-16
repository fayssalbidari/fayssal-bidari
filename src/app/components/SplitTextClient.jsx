"use client";

import React, { useEffect, useState } from "react";

export default function SplitTextClient({ onLoaded }) {
  const [SplitType, setSplitType] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    import("../lib/SplitType").then((mod) => {
      setSplitType(() => mod.default);
      if (onLoaded) onLoaded(mod.default);
    });
  }, [onLoaded]);

  return null; // Ce composant ne rend rien, il sert juste à charger SplitType
}
