import React, { useEffect, useRef, useState, Ref, RefObject } from "react";
import { ReuseSelectDropdown } from "@locoworks/reusejs-react-select-dropdown";
import { HeadlessButton } from "@locoworks/reusejs-react-button";
const ForwardRefInputGroup = () => {
  const selectRef: any = useRef<Ref<HTMLInputElement> | undefined>(null);
  useEffect(() => {
    if (selectRef.current) {
      const current = selectRef.current;
      const inputElement = current.childNodes[0]
        .childNodes[0] as HTMLInputElement;
      inputElement.style.border = "solid blue 3px";
    }
  }, []);

  const options = [
    { label: "One", value: "1" },
    { label: "Two", value: "2" },
    { label: "Three", value: "3" },
    { label: "Four", value: "4" },
    { label: "Five", value: "5" },
    { label: "Six", value: "6" },
    { label: "Seven", value: "7" },
    { label: "Eight", value: "8" },
    { label: "Nine", value: "9" },
    { label: "Ten", value: "10" },
    { label: "Eleven", value: "11" },
    { label: "Twelve", value: "12" },
    { label: "Thirteen", value: "13" },
  ];

  const option2 = [
    { label: "One00", value: "10" },
    { label: "Two00", value: "20" },
    { label: "Three00", value: "30" },
    { label: "Four00", value: "40" },
    { label: "Five00", value: "50" },
    { label: "Six00", value: "60" },
    { label: "Seven00", value: "70" },
    { label: "Eight00", value: "80" },
    { label: "Nine00", value: "90" },
    { label: "Ten00", value: "100" },
    { label: "Eleven00", value: "110" },
    { label: "Twelve00", value: "120" },
    { label: "Thirteen00", value: "130" },
  ];

  const option3 = [
    {
      fname: "John",
      lname: "Doe",
      id: "1001",
      age: "25",
    },
    {
      fname: "Alice",
      lname: "Smith",
      id: "1002",
      age: "30",
    },
    {
      fname: "Michael",
      lname: "Johnson",
      id: "1003",
      age: "40",
    },
    {
      fname: "Emily",
      lname: "Brown",
      id: "1004",
      age: "22",
    },
    {
      fname: "David",
      lname: "Miller",
      id: "1005",
      age: "35",
    },
    {
      fname: "Sophia",
      lname: "Wilson",
      id: "1006",
      age: "28",
    },
    {
      fname: "Jacob",
      lname: "Taylor",
      id: "1007",
      age: "31",
    },
    {
      fname: "Olivia",
      lname: "Anderson",
      id: "1008",
      age: "27",
    },
    {
      fname: "Ethan",
      lname: "Clark",
      id: "1009",
      age: "33",
    },
    {
      fname: "Ava",
      lname: "White",
      id: "1010",
      age: "29",
    },
  ];

  const optionsChanged = option3.map((ele) => {
    return { ...ele, label: ele.fname + " " + ele.lname, value: ele.id };
  });

  const [displayOptions, setDisplayOptions] = useState(options);
  const [refresher, setRefresher] = useState(new Date());

  return (
    <div className="flex flex-col items-center gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
      <button
        onClick={() => {
          setDisplayOptions(option2);
          setRefresher(new Date());
        }}
      >
        Switch
      </button>
      <ReuseSelectDropdown
        ref={selectRef}
        options={optionsChanged}
        valueKey={"id"}
        displayKey={"fname"}
        multiple
        enableSearch
        refresh={refresher}
      />
    </div>
  );
};

export default ForwardRefInputGroup;
