import React from "react";
import useHeadlessSelectHook from "@locoworks/reusejs-react-select-dropdown";

const NoOptionsRenderer = () => {
  return <div className="flex justify-center my-2">No Options found</div>;
};

const HeadlessSelectSample = ({
  //   options,
  optionRenderer,
  noOptionsRenderer,
  searchFilter,
  multiple = false,
  defaultSelected = [],
  header,
  footer,
  onChange,
  valueKey,
  filterFunction,
  clearQuery,
  defaultQuery = "",
  defaultOpen = false,
}) => {
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
  ];

  const valueKey = "value";

  const {
    open,
    setOpen,
    query,
    setQuery,
    selectedValues,
    // setSelectedValues,
    filteredOptions,
    // setFilteredOptions,
    addOrRemove,
    outsideClickRef,
  } = useHeadlessSelectHook({
    options: options,
    valueKey: valueKey,
    onChange,
    filterFunction,
    clearQuery,
    defaultSelected,
    defaultOpen,
    defaultQuery,
  });

  return (
    <div className="flex flex-col  w-full px-4">
      {header && header}
      <div className="relative" ref={outsideClickRef}>
        <div
          className="bg-white border border-black rounded px-4 flex items-center w-48 h-10 cursor-pointer"
          onClick={() => {
            setOpen((prev) => !prev);
          }}
        >
          <p className="overflow-hidden text-ellipsis whitespace-nowrap">
            {selectedValues?.length !== 0
              ? selectedValues.map((option) => option.label).join(", ")
              : "Open Dropdown"}
          </p>
        </div>
        {open && (
          <div className="absolute top-10 bg-white rounded px-3 py-2 border border-slate-100 w-1/2 max-h-48 overflow-scroll">
            {searchFilter && (
              <input
                className=" sticky top-0 w-full rounded bg-slate-200 px-2"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            )}
            {filteredOptions?.map((option, index) => {
              if (selectedValues.includes(option)) {
                return (
                  <div
                    className={
                      "bg-green-100 hover:bg-green-500 hover:text-white hover:font-bold px-2 py-1 flex justify-between w-full" +
                      (index === filteredOptions.length - 1
                        ? ""
                        : "border-b border-slate-300")
                    }
                    onClick={() => addOrRemove(multiple, option)}
                    key={"selected" + option.label + option.value}
                  >
                    <label>{option.label}</label>
                    <label className="font-bold">{option.value}</label>
                  </div>
                );
              }
              return (
                <div
                  className={
                    "hover:bg-blue-500 hover:text-white hover:font-bold px-2 py-1 flex justify-between w-full" +
                    (index === filteredOptions.length - 1
                      ? ""
                      : "border-b border-slate-300")
                  }
                  key={option.value + option.label}
                  onClick={() => addOrRemove(multiple, option)}
                >
                  <label>{option.label}</label>
                  <label className="font-bold">{option.value}</label>
                </div>
              );
            })}
            {filteredOptions.length === 0 && noOptionsRenderer ? (
              noOptionsRenderer
            ) : (
              <NoOptionsRenderer />
            )}
          </div>
        )}
      </div>
      {footer && footer}
    </div>
  );
};

export default HeadlessSelectSample;
