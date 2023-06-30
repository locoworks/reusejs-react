import React, { CSSProperties, forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { useHeadlessSelectHook } from "@locoworks/reusejs-toolkit-react-hooks";

export interface OptionInterface {
  [key: string]: any;
}
export interface ReuseSelectProps {
  options: OptionInterface[];
  optionsRenderer?: (
    selectedValues: any,
    filteredOptions: any,
    addOrRemove: any,
    setQuery: React.Dispatch<React.SetStateAction<string>>
  ) => React.ReactNode;
  searchFilter?: boolean;
  enableSearch?: boolean;
  multiple?: boolean;
  defaultSelected?: OptionInterface[];
  header?: React.ReactNode;
  footer?: React.ReactNode;
  onChange?: () => void;
  valueKey: string;
  displayKey: string;
  noOptionsRenderer?: React.ReactNode;
  filterFunction?: any;
  clearQuery?: boolean;
  defaultOpen?: boolean;
  defaultQuery?: string;
  dropDownText?: string;
  optionsWrapper?: string | CSSProperties;
  selectWrapper?: string | CSSProperties;
  selectButtonStyles?: string | CSSProperties;
  selectButtonOverflowWrappper?: string | CSSProperties;
  inputStyles?: string | CSSProperties;
  refresh?: any;
}

const DefaultNoOptionsRenderer = () => {
  return <div className="flex justify-center my-2">No Options found</div>;
};

export interface DefaultOptionsComponentProps {
  selectedValues: any;
  index: any;
  valueKey: string;
  filteredOptions: any;
  addOrRemove: any;
  multiple: boolean;
  option: any;
  activeStyles?: string | CSSProperties;
  inactiveStyles?: string | CSSProperties;
  borderStyles?: string | CSSProperties;
}

const DefaultOptionsComponent: React.FC<DefaultOptionsComponentProps> = ({
  selectedValues,
  valueKey,
  option,
  index,
  filteredOptions,
  addOrRemove,
  multiple,
  activeStyles = "",
  inactiveStyles = "",
  borderStyles = "",
}) => {
  const defaultActiveStyles =
    "bg-green-100 hover:bg-green-500 hover:text-white hover:font-bold px-2 py-1 flex justify-between w-full";
  const defaultInactiveStyles =
    "hover:bg-blue-500 hover:text-white hover:font-bold px-2 py-1 flex justify-between w-full";

  const defaultborderStyles =
    index === filteredOptions.length - 1 ? "" : "border-b border-slate-300";

  return (
    <div
      className={
        typeof activeStyles === "string" &&
        typeof inactiveStyles === "string" &&
        typeof borderStyles === "string"
          ? selectedValues
              .map((val: any) => val[valueKey])
              .includes(option[valueKey])
            ? twMerge(
                defaultActiveStyles + " " + defaultborderStyles,
                activeStyles,
                borderStyles
              )
            : twMerge(
                defaultInactiveStyles + " " + defaultborderStyles,
                inactiveStyles,
                borderStyles
              )
          : ""
      }
      style={
        typeof activeStyles === "object" &&
        typeof inactiveStyles === "object" &&
        typeof borderStyles === "object"
          ? {
              ...activeStyles,
              ...inactiveStyles,
              ...borderStyles,
            }
          : {}
      }
      key={option.value + option.label}
      onClick={() => addOrRemove(multiple, option)}
    >
      <label>{option.label}</label>
    </div>
  );
};

const MemoizedDefaultOptionsComponent = React.memo(DefaultOptionsComponent);

const ReuseSelectDropDown: React.ForwardRefRenderFunction<HTMLInputElement, ReuseSelectProps> = ({ 
  options,
  optionsRenderer,
  noOptionsRenderer,
  multiple = false,
  defaultSelected = [],
  header,
  footer,
  onChange,
  valueKey,
  displayKey,
  filterFunction,
  clearQuery = true,
  defaultQuery = "",
  defaultOpen = false,
  enableSearch = false,
  dropDownText = "Open Dropdown",
  optionsWrapper = "",
  selectWrapper = "",
  selectButtonStyles = "",
  selectButtonOverflowWrappper = "",
  inputStyles = "",
  refresh,
},ref) => {
  const {
    open,
    setOpen,
    query,
    setQuery,
    selectedValues,
    filteredOptions,
    addOrRemove,
    outsideClickRef,
  } = useHeadlessSelectHook({
    options,
    valueKey,
    onChange,
    filterFunction,
    clearQuery,
    defaultSelected,
    defaultOpen,
    defaultQuery,
    refresh,
  });

  const defaultOptionsWrapper =
    "absolute top-10 bg-white rounded px-3 py-2 border border-slate-100 w-1/2 max-h-48 overflow-scroll";
  const defaultSelectWrapper = "flex flex-col w-full flex px-4";
  const defaultSelectButtonStyles =
    "bg-white border border-black rounded px-4 flex items-center w-1/2 h-10 cursor-pointer";
  const defaultSelectButtonOverflowWrappper =
    "overflow-hidden text-ellipsis whitespace-nowrap";
  const defaultInputStyles =
    "bg-white border border-black rounded px-4 flex items-center w-1/2 h-10 cursor-pointer";

  const selectButton = (
    <div
      className={
        typeof selectButtonStyles === "string"
          ? twMerge(defaultSelectButtonStyles, selectButtonStyles)
          : ""
      }
      style={typeof selectButtonStyles === "object" ? selectButtonStyles : {}}
      onClick={() => {
        setOpen((prev) => !prev);
      }}
    >
      <p
        className={
          typeof selectButtonOverflowWrappper === "string"
            ? twMerge(
                defaultSelectButtonOverflowWrappper,
                selectButtonOverflowWrappper
              )
            : ""
        }
        style={
          typeof selectButtonOverflowWrappper === "object"
            ? selectButtonOverflowWrappper
            : {}
        }
      >
        {selectedValues?.length !== 0
          ? selectedValues.map((option) => option[displayKey]).join(", ")
          : dropDownText}
      </p>
    </div>
  );

  const selectInput = (
    <input
      autoFocus
      className={
        typeof inputStyles === "string"
          ? twMerge(defaultInputStyles, inputStyles)
          : ""
      }
      style={typeof inputStyles === "object" ? inputStyles : {}}
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
console.log("this is form the select base file.",{ref})
  return (
    <div
    ref={ref}
      className={
        typeof selectWrapper === "string"
          ? twMerge(defaultSelectWrapper, selectWrapper)
          : ""
      }
      style={typeof selectWrapper === "object" ? selectWrapper : {}}
    >
      {header && header}
      <div className="relative" ref={outsideClickRef}>
        {!open ? selectButton : enableSearch ? selectInput : selectButton}
        {open && (
          <div
            className={
              typeof optionsWrapper === "string"
                ? twMerge(defaultOptionsWrapper, optionsWrapper)
                : ""
            }
            style={typeof optionsWrapper === "object" ? optionsWrapper : {}}
          >
            {optionsRenderer
              ? optionsRenderer(
                  selectedValues,
                  filteredOptions,
                  addOrRemove,
                  setQuery
                )
              : filteredOptions?.map(
                  (option: OptionInterface, index: number) => {
                    return (
                      <MemoizedDefaultOptionsComponent
                        key={option[valueKey] + index}
                        selectedValues={selectedValues}
                        valueKey={valueKey}
                        option={option}
                        index={index}
                        filteredOptions={filteredOptions}
                        addOrRemove={addOrRemove}
                        multiple={multiple}
                      />
                    );
                  }
                )}
            {filteredOptions.length === 0 &&
              (noOptionsRenderer ? (
                noOptionsRenderer
              ) : (
                <DefaultNoOptionsRenderer />
              ))}
          </div>
        )}
      </div>
      {footer && footer}
    </div>
  );
};

export default forwardRef<HTMLInputElement, ReuseSelectProps>(ReuseSelectDropDown);