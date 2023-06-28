/**
 * useOutsideClicker
 *
 * A custom hook that detects clicks outside a specified element and invokes a callback function.
 *
 * @param {Function} callback - The callback function to be invoked on outside clicks.
 * @returns {React.MutableRefObject} - A mutable ref object that should be assigned to the component or element to track outside clicks.
 */
import React from "react";

export let useOutsideClicker = (callback: () => void) => {
  const visRef = React.useRef<any>(null);

  const handleClickOutside = (event: { target: any }) => {
    if (visRef.current && !visRef.current?.contains(event.target)) {
      callback();
    }
  };

  React.useEffect(() => {
    if (document !== undefined) {
      document.addEventListener("click", handleClickOutside, true);
    }
    return () => {
      if (document !== undefined) {
        document.removeEventListener("click", handleClickOutside, true);
      }
    };
  }, []);

  return visRef;
};
