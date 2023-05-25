import React, { FC, CSSProperties, useRef } from "react";

export interface HeadlessTextInputProps {
  wrapperClassName?: string;
  inputClassName?: string;
  disabled?: boolean;
  inputStyles?: CSSProperties;
  label?: React.ReactNode;
  textInputPrefix?: React.ReactNode;
  textInputSuffix?: React.ReactNode;
  error?: React.ReactNode;
  textInputBottom?: React.ReactNode;
  autoComplete?: string;
  id?: string;
  value?: string;
  type?: string;
  name?: string;
  placeholder?: string;
  ariaDescribedby?: string;
  checked?: boolean;
  min?: number | string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onWheel?: (e: React.WheelEvent<HTMLInputElement>) => void;
}

const HeadlessTextInput: FC<HeadlessTextInputProps> = (props) => {
  const textInputRef = useRef<HTMLInputElement>(null);
  return (
    <>
      {props?.label !== undefined && props.label}
      <div className={props.wrapperClassName}>
        {props.textInputPrefix && props.textInputPrefix}
        <input
          style={props.inputStyles}
          autoComplete={props.autoComplete}
          role="presentation"
          id={props.id}
          value={props.value}
          ref={textInputRef}
          type={props.type}
          name={props.name}
          className={props.inputClassName}
          placeholder={props.placeholder}
          aria-describedby={props.ariaDescribedby}
          disabled={props.disabled}
          checked={props.checked}
          onChange={(e) => {
            if (props.onChange) {
              props.onChange(e);
            }
          }}
          onBlur={(e) => {
            if (props.onBlur) {
              props.onBlur(e);
            }
          }}
          onFocus={(e) => {
            if (props.onFocus) {
              props.onFocus(e);
            }
          }}
          onKeyDown={(e) => {
            if (props.onKeyDown) {
              props.onKeyDown(e);
            }
          }}
          onWheel={(e) => {
            if (props.onWheel) {
              props.onWheel(e);
            }
          }}
          min={props.min ? props.min : ""}
        />
        {props.textInputSuffix && props.textInputSuffix}
      </div>
      {props.error && props.error}
      {!props.error && props.textInputBottom && props.textInputBottom}
    </>
  );
};

HeadlessTextInput.defaultProps = {};

export default HeadlessTextInput;
