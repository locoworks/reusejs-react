import React, { useState } from "react";
import { ReuseInputGroup } from "@locoworks/reusejs-react-input-group";
import { ReuseSelectDropdown } from "@locoworks/reusejs-react-select-dropdown";

interface PrefixProps {
  size: string;
}

const Prefix = ({ size }: PrefixProps): JSX.Element => {
  return (
    <div className="absolute top-1/2 -translate-y-1/2 left-2 font-bold">
      {size}
    </div>
  );
};

const SizeInputGroup = () => {
  return (
    <div className="flex items-center gap-x-3 justify-center py-10 px-32 mt-10 border rounded bg-gray-50">
      <ReuseInputGroup
        className="py-4 px-16 text-xl"
        placeholder="Enter the number"
        prefix={<Prefix size="Big" />}
      />
      <ReuseInputGroup
        className="py-3 px-20 text-lg"
        placeholder="Enter the number"
        prefix={<Prefix size="Medium" />}
      />
      <ReuseInputGroup
        className="py-2 px-16 text-sm"
        placeholder="Enter the number"
        prefix={<Prefix size="Small" />}
      />
    </div>
  );
};

export default SizeInputGroup;
