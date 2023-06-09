import React, { useState } from "react";

const HeadlessSelectDropdown = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [value, setValue] = useState<any>([]);

  const toggle = (value: boolean | undefined | null) => {
    if (typeof value === "boolean") {
      setShowOptions(!value);
    }
    setShowOptions((current) => !current);
  };

  const addValue = (value: any) => {
    console.log(value);
  };

  const setSelected = (value: any) => {
    setValue([value]);
  };

  return { value, setSelected, toggle, showOptions, addValue };
};

export default HeadlessSelectDropdown;
