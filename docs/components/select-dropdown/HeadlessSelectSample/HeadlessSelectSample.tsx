import React from "react";
import { useHeadlessSelectHook } from "@locoworks/reusejs-toolkit-react-hooks";

const NoOptionsRenderer = () => {
  return <div className="flex justify-center my-2">No Options found</div>;
};

export interface SelectedOptionProps {
  index: any;
  filteredOptions: any;
  addOrRemove: any;
  multiple: boolean;
  option: any;
}
const SelectedOption: React.FC<SelectedOptionProps> = ({
  index,
  filteredOptions,
  addOrRemove,
  multiple,
  option,
}) => {
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
};

const MemoizedSelectedOption = React.memo(SelectedOption);

const UnSelectedOption: React.FC<SelectedOptionProps> = ({
  index,
  filteredOptions,
  addOrRemove,
  multiple,
  option,
}) => {
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
};

const MemoizedUnSelectedOption = React.memo(UnSelectedOption);

const HeadlessSelectSample: React.FC = ({}) => {
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

  const searchFilter = true;
  const multiple = true;

  const filterFunction = (ele: any, query: string) => {
    return ele.label.toLowerCase().includes(query.toLowerCase());
  };

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
    options,
    valueKey,
    // onChange,
    filterFunction,
    clearQuery: true,
    defaultSelected: [
      { label: "Ten", value: "10" },
      { label: "Three", value: "3" },
    ],
    // defaultOpen,
    // defaultQuery,
  });

  return (
    <div className="flex flex-col items-center gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
      <div className="flex flex-col  w-full px-4">
        {/* {header && header} */}
        <div>Select</div>
        <div className="relative" ref={outsideClickRef}>
          {!open ? (
            <div
              className="bg-white border border-black rounded px-4 flex items-center w-48 h-10 cursor-pointer"
              onClick={() => {
                setOpen((prev: any) => !prev);
              }}
            >
              <p className="overflow-hidden text-ellipsis whitespace-nowrap">
                {selectedValues?.length !== 0
                  ? selectedValues.map((option: any) => option.label).join(", ")
                  : "Open Dropdown"}
              </p>
            </div>
          ) : (
            <input
              className="form-input bg-white border border-black rounded px-4 flex items-center w-48 h-10 cursor-pointer"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          )}
          {open && (
            <div className="absolute top-10 bg-white rounded px-3 py-2 border border-slate-100 w-1/2 max-h-48 overflow-scroll">
              {/* {searchFilter && (
                <input
                  className=" sticky top-0 w-full rounded bg-slate-200 px-2"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              )} */}
              {filteredOptions?.map((option: any, index: number) => {
                if (
                  selectedValues
                    .map((val: any) => val[valueKey])
                    .includes(option[valueKey])
                ) {
                  return (
                    <MemoizedSelectedOption
                      key={"selected" + index}
                      index={index}
                      filteredOptions={filteredOptions}
                      addOrRemove={addOrRemove}
                      multiple={multiple}
                      option={option}
                    />
                  );
                }
                return (
                  <MemoizedUnSelectedOption
                    key={"selected" + index}
                    index={index}
                    filteredOptions={filteredOptions}
                    addOrRemove={addOrRemove}
                    multiple={multiple}
                    option={option}
                  />
                );
              })}
              {filteredOptions.length === 0 && <NoOptionsRenderer />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeadlessSelectSample;
