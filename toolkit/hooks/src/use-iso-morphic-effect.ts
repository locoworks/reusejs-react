/**
 * useIsoMorphicEffect
 *
 * A custom hook that provides an isomorphic (server-client) effect based on the environment.
 *
 * @param {Function} effect - The effect function to be executed.
 * @param {Array} deps - An optional array of dependencies for the effect.
 */
import React, { EffectCallback, DependencyList } from "react";
import { env } from "@locoworks/reusejs-toolkit-utils";

export let useIsoMorphicEffect = (
  effect: EffectCallback,
  deps?: DependencyList | undefined
) => {
  if (env.isServer) {
    React.useEffect(effect, deps);
  } else {
    React.useLayoutEffect(effect, deps);
  }
};
