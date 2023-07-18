import { useState } from "react";
import useBetaErrors from "./errors";
import validate from "validate.js";
import result from "lodash/result";

/**
 * Resolves the value of a nested object property based on a dot-separated path.
 * @param path - The dot-separated path of the property.
 * @param obj - The object to resolve the property from.
 * @returns The resolved property value or null if the property doesn't exist.
 */
function resolve(path: string, obj: any) {
  return path.split(".").reduce(function (prev, curr) {
    return prev ? prev[curr] : null;
  }, obj);
}

/**
 * Sets the value of a nested object property based on a dot-separated path.
 * @param obj - The object to set the property on.
 * @param path - The dot-separated path of the property.
 * @param val - The value to set for the property.
 * @returns The modified object.
 */
function setByDot(obj: any, path: string, val: any) {
  path.split(".").reduce(function (prev, curr, _idx, _arr) {
    if (_idx === _arr.length - 1 && prev) {
      prev[curr] = val;
    }
    return prev ? prev[curr] : null;
  }, obj);

  return obj;
}

/**
 * A custom React hook for form handling and validation.
 * @param initial - The initial form values.
 * @returns An object containing form handling functions and state values.
 */
export function useBetaForm(initial: any) {
  const [value, setValue] = useState<any>(initial);
  const [rules, setRules] = useState<any>({});
  const [busy, setBusy] = useState<any>(false);
  const [successful, setSuccessful] = useState<any>(false);
  const errors = useBetaErrors();

  return {
    value,
    setValue,
    errors,
    busy,
    setValidationRules: (v: any) => {
      setRules(v);
    },
    /**
     * Validates the form values based on the defined validation rules.
     * @returns true if the form is valid, false otherwise.
     */
    validate: () => {
      setBusy(true);
      let validateJsErrors = validate(value, rules);

      if (validateJsErrors === undefined) {
        errors.set({});
      } else {
        errors.set(validateJsErrors);
      }
      setBusy(false);
      return validateJsErrors === undefined ? true : false;
    },
    /**
     * Validates a single form field based on its validation rules.
     * @param v - The value of the field to validate.
     * @param key - The key of the field in the rules object.
     * @returns true if the field is valid, false otherwise.
     */
    validateSingleField: (v: any, key: any) => {
      setBusy(true);

      let fieldRules = result(rules, key);

      let validateJsErrorsForField = validate.single(v, fieldRules);
      if (validateJsErrorsForField === undefined) {
        errors.popError(key);
      } else {
        errors.push({
          [key]: validateJsErrorsForField,
        });
      }
      setBusy(false);
      return validateJsErrorsForField === undefined ? true : false;
    },
    /**
     * Sets the value of a form field.
     * @param k - The key or path of the field to set.
     * @param v - The new value for the field.
     */
    setField: (k: any, v: any) =>
      setValue((s: any) => {
        s = setByDot(s, k, v);
        s = s;
        return { ...s };
      }),
    /**
     * Starts the form processing state by clearing errors and setting busy status.
     */
    startProcessing: () => {
      errors.forget();
      setBusy(true);
      setSuccessful(false);
    },
    /**
     * Finishes the form processing state by setting busy and successful status.
     */
    finishProcessing: () => {
      setBusy(false);
      setSuccessful(true);
    },
    /**
     * Resets the form status by clearing errors, setting busy and successful status.
     */
    resetStatus: () => {
      errors.forget();
      setBusy(false);
      setSuccessful(false);
    },
    /**
     * Sets the form errors.
     * @param data - The error data to set.
     */
    setErrors: (data: any) => {
      // console.log("data", data);
      errors.set(data);
      setBusy(false);
    },
    /**
     * Pushes an error to the form errors.
     * @param data - The error data to push.
     */
    pushError: (data: any) => {
      errors.push(data);
      setBusy(false);
    },
    /**
     * Clears all form errors.
     */
    forgetErrors: (data: any) => {
      errors.set({});
      setBusy(false);
    },
    /**
     * Removes a specific error from the form errors.
     * @param data - The error data to remove.
     */
    removeError: (data: any) => {
      errors.popError(data);
      setBusy(false);
    },
    /**
     * Get the value of specific field
     * @param data - key name for field to resolve against the form value
     * @returns The resolved property value or null if the property doesn't exist.
     */
    getField: (field: any) => {
      return resolve(field, value);
    },
  };
}
