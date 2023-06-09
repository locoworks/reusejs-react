import { HeadlessSelectDropdown } from "@locoworks/reusejs-react-select-dropdown";
import React from "react";
import useOutsideClicker from "./useOutsideClicker";

const IndividualOption = (
  option: any,
  setSelected: any,
  toggle: any,
  value: any
) => {
  return (
    <div
      key={option.label}
      className={
        "border-b " +
        (value[0]?.value === option.value
          ? "bg-green-300"
          : "bg-green-200 hover:bg-green-300")
      }
      onClick={() => {
        setSelected(option);
        toggle(false);
      }}
    >
      {option.label}
    </div>
  );
};

const Sample = () => {
  const { showOptions, toggle, value, setSelected } = HeadlessSelectDropdown();

  const options = [
    { label: "one", value: 1 },
    { label: "two", value: 2 },
    { label: "three", value: 3 },
    { label: "four", value: 4 },
    { label: "five", value: 5 },
  ];

  const visRef = useOutsideClicker(() => {
    toggle(false);
  });

  return (
    <div className="flex flex-col items-center gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
      {/* <HeadlessSelectDropdown /> */}
      <div>{JSON.stringify(value)}</div>

      <div ref={visRef} className="relative w-full px-20" tabIndex={1}>
        <div
          className="border bg-red-300 w-20 cursor-pointer"
          onClick={() => toggle(null)}
        >
          Menu
        </div>
        {showOptions && (
          <div className="absolute bg-blue-50 border rounded w-1/2 translate-y-full bottom-0">
            <input
              placeholder="Search"
              className="justify-self-center w-full"
            />
            {options.map((option) => {
              return (
                <div
                  key={option.label}
                  className={
                    "border-b " +
                    (value[0]?.value === option.value
                      ? "bg-green-300"
                      : "bg-green-200 hover:bg-green-300")
                  }
                  onClick={() => {
                    setSelected(option);
                    toggle(false);
                  }}
                >
                  {option.label}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sample;
