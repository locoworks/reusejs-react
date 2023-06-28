import React, { useEffect } from "react";
import { ReuseInput } from "@locoworks/reusejs-react-input";
import { useRef } from "react";
import { HeadlessButton } from "@locoworks/reusejs-react-button";
const Forwardrefinput = () => {
    const sampleref = useRef();
     useEffect(() => {
      if(sampleref.current){
        sampleref.current.focus();
      }
     }, []);
    const handleClick = () => {
        
        let a = sampleref.current.value;
        alert(`${a} is the value of input `)

      };
  return (
    <div className="flex gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
      <ReuseInput inputRef = {sampleref}  placeholder="start typing." />
      <HeadlessButton className="bg-blue-200 border border-blue-400 rounded px-3 py-1" onClick={handleClick}>
        Get Value
      </HeadlessButton>
      
    </div>
  );
};

export default Forwardrefinput;
