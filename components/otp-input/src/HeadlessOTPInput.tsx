import React, { CSSProperties } from "react";

type AllowedInputTypes = "password" | "text" | "number" | "tel";

type InputProps = Required<
  Pick<
    React.InputHTMLAttributes<HTMLInputElement>,
    | "value"
    | "onChange"
    | "onFocus"
    | "onBlur"
    | "onKeyDown"
    | "onPaste"
    | "aria-label"
    | "maxLength"
    | "autoComplete"
    | "style"
  > & {
    ref: React.RefCallback<HTMLInputElement>;
    placeholder: string | undefined;
    className: string | undefined;
    type: AllowedInputTypes;
  }
>;

export interface HeadlessOTPInputProps {
  value?: string;
  numInputs?: number;
  onChange: (otp: string) => void;
  renderInput: (inputProps: InputProps, index: number) => React.ReactNode;
  shouldAutoFocus?: boolean;
  placeholder?: string;
  renderSeparator?: ((index: number) => React.ReactNode) | React.ReactNode;
  containerStyle?: React.CSSProperties | string;
  inputStyle?: React.CSSProperties | string;
  inputType?: AllowedInputTypes;
}

const isStyleObject = (obj: unknown) => typeof obj === "object" && obj !== null;

const HeadlessOTPInput: React.FC<HeadlessOTPInputProps> = ({
  value = "",
  numInputs = 4,
  onChange,
  renderInput,
  shouldAutoFocus = false,
  inputType = "text",
  renderSeparator,
  placeholder,
  containerStyle,
  inputStyle,
}) => {
  const [activeInput, setActiveInput] = React.useState(0);
  const inputRefs = React.useRef<Array<HTMLInputElement | null>>([]);

  const getOTPValue = () => (value ? value.toString().split("") : []);

  const isInputNum = inputType === "number" || inputType === "tel";

  React.useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, numInputs);
  }, [numInputs]);

  React.useEffect(() => {
    if (shouldAutoFocus) {
      inputRefs.current[0]?.focus();
    }
  }, [shouldAutoFocus]);

  const getPlaceholderValue = () => {
    if (typeof placeholder === "string") {
      if (placeholder.length === numInputs) {
        return placeholder;
      }

      if (placeholder.length > 0) {
        console.error(
          "Length of the placeholder should be equal to the number of inputs."
        );
      }
    }
    return undefined;
  };

  const isInputValueValid = (value: string) => {
    const isTypeValid = isInputNum
      ? !isNaN(Number(value))
      : typeof value === "string";
    return isTypeValid && value.trim().length === 1;
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement> &
      React.CompositionEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;

    const temp = false;
    if (isInputValueValid(value)) {
      changeCodeAtFocus(value);
      focusInput(activeInput + 1);
    } else {
      const { nativeEvent } = event;

      if (
        nativeEvent.data === null &&
        (nativeEvent as unknown as InputEvent).inputType ===
          "deleteContentBackward"
      ) {
        event.preventDefault();
        changeCodeAtFocus("");
        focusInput(activeInput - 1);
      }
    }
  };

  const handleFocus =
    (event: React.FocusEvent<HTMLInputElement>) => (index: number) => {
      setActiveInput(index);
      event.target.select();
    };

  const handleBlur = () => {
    setActiveInput(activeInput - 1);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const otp = getOTPValue();
    if ([event.code, event.key].includes("Backspace")) {
      event.preventDefault();
      changeCodeAtFocus("");
      focusInput(activeInput - 1);
    } else if (event.code === "Delete") {
      event.preventDefault();
      changeCodeAtFocus("");
    } else if (event.code === "ArrowLeft") {
      event.preventDefault();
      focusInput(activeInput - 1);
    } else if (event.code === "ArrowRight") {
      event.preventDefault();
      focusInput(activeInput + 1);
    } else if (event.key === otp[activeInput]) {
      event.preventDefault();
      focusInput(activeInput + 1);
    } else if (
      event.code === "Spacebar" ||
      event.code === "Space" ||
      event.code === "ArrowUp" ||
      event.code === "ArrowDown"
    ) {
      event.preventDefault();
    } else if (isInputNum && !isInputValueValid(event.key)) {
      event.preventDefault();
    }

    if (otp.length === numInputs) {
      event.preventDefault();
    }
  };

  const focusInput = (index: number) => {
    const activeInput = Math.max(Math.min(numInputs - 1, index), 0);

    if (inputRefs.current[activeInput]) {
      inputRefs.current[activeInput]?.focus();
      inputRefs.current[activeInput]?.select();
      setActiveInput(activeInput);
    }
  };

  const changeCodeAtFocus = (value: string) => {
    const otp = getOTPValue();
    otp[activeInput] = value[0];
    handleOTPChange(otp);
  };

  const handleOTPChange = (otp: Array<string>) => {
    const otpValue = otp.join("");
    onChange(otpValue);
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();

    const otp = getOTPValue();
    let nextActiveInput = activeInput;

    const pastedData = event.clipboardData
      .getData("text/plain")
      .slice(0, numInputs - activeInput)
      .split("");

    if (isInputNum && pastedData.some((value) => isNaN(Number(value)))) {
      return;
    }

    for (let pos = 0; pos < numInputs; ++pos) {
      if (pos >= activeInput && pastedData.length > 0) {
        otp[pos] = pastedData.shift() ?? "";
        nextActiveInput++;
      }
    }

    focusInput(nextActiveInput);
    handleOTPChange(otp);
  };
  return (
    <div>
      <div
        style={Object.assign(
          { display: "flex", alignItems: "center" },
          isStyleObject(containerStyle) && containerStyle
        )}
        className={
          typeof containerStyle === "string" ? containerStyle : undefined
        }
      >
        {Array.from({ length: numInputs }, (_, index) => index).map((index) => (
          <React.Fragment key={index}>
            {renderInput(
              {
                value: getOTPValue()[index] ?? "",
                placeholder: getPlaceholderValue()?.[index] ?? undefined,
                ref: (element) => (inputRefs.current[index] = element),
                onChange: handleChange,
                onFocus: (event) => handleFocus(event)(index),
                onBlur: handleBlur,
                onKeyDown: handleKeyDown,
                onPaste: handlePaste,
                autoComplete: "off",
                maxLength: 1,
                "aria-label": `Please enter OTP character ${index + 1}`,
                style: isStyleObject(inputStyle)
                  ? (inputStyle as CSSProperties)
                  : {},
                className:
                  typeof inputStyle === "string" ? inputStyle : undefined,
                type: inputType,
              },
              index
            )}
            {index < numInputs - 1 &&
              (typeof renderSeparator === "function"
                ? renderSeparator(index)
                : renderSeparator)}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default HeadlessOTPInput;
