// Debounce Function with custom delay, dependencies and callback function.

import React from "react";
import { useIsoMorphicEffect } from "./use-iso-morphic-effect";

export let useDebounceEffect = (
  callback: React.EffectCallback,
  delay: number,
  deps: React.DependencyList
) => {
  useIsoMorphicEffect(() => {
    const debounceTimer = setTimeout(() => {
      callback();
    }, delay);
    return () => clearTimeout(debounceTimer);
  }, deps);
};
