/**
 * Custom hook for running an effect only after the component has mounted (similar to componentDidMount).
 *
 * @param {Function} func - The effect function to be executed after the component has mounted.
 * @param {Array} deps - An array of dependencies that determines when the effect should re-run.
 */

import React from "react";

// https://stackoverflow.com/a/57941438/17167844

export let useDidMountEffect = (func: any, deps: any) => {
  const didMount = React.useRef(false);

  React.useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
  }, deps);
};
