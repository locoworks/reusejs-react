

import React, { useState } from "react";
import { ReuseInputGroup } from "@locoworks/reusejs-react-input-group";
import { ReuseSelectDropdown } from "@locoworks/reusejs-react-select-dropdown";


const Prefix = ({size}) => {
    
  return (
    <div className="absolute top-1/2 -translate-y-1/2 left-2 font-bold">
        {size}
    </div>
  );
};

const SizeInputGroup = () => {



  return (
    <div className="flex  items-center gap-x-3 justify-center py-10 px-32 mt-10 border rounded bg-gray-50">
      <ReuseInputGroup
        className="pl-10 px-16"
        placeholder="Enter the number"
        prefix={<Prefix size={"big"}/>}
      />
    </div>
  );
};

export default SizeInputGroup;
