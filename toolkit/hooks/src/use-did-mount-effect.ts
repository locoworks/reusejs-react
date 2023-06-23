import React from "react";

// https://stackoverflow.com/a/57941438/17167844

export let useDidMountEffect = (func: any, deps: any) => {
  const didMount = React.useRef(false);

  React.useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
  }, deps);
};
