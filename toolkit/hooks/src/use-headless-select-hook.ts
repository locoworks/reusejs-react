/**
 * Custom hook for creating a headless select component.
 *
 * @param {Object} options - An array of options to be displayed in the select component.
 * @param {string} valueKey - The key in the options objects that represents the value.
 * @param {Function} onChange - Callback function called when the selected values change.
 * @param {Function} filterFunction - Custom filter function to filter the options based on the query.
 * @param {boolean} clearQuery - Flag indicating whether to clear the query when the select component closes.
 * @param {Array} defaultSelected - The default selected values for the select component.
 * @param {boolean} defaultOpen - The default open state of the select component.
 * @param {string} defaultQuery - The default query for filtering the options.
 * @param {any} refresh - Dependency to refresh the select component.
 *
 * @returns {Object} - An object containing the state and functions of the headless select component.
 */
import React, { useEffect, useState, useCallback } from "react";
import { useOutsideClicker } from "./use-outside-clicker";
import { useDebounceEffect } from "./use-debounce-effect";
import { useDidMountEffect } from "./use-did-mount-effect";

export interface OptionInterface {
	[key: string]: any;
}

export interface HeadlessSelectProps {
	options: {
		[key: string]: any;
	}[];
	valueKey: string;
	onChange?: (arg: OptionInterface) => void;
	filterFunction?: (ele: OptionInterface, query: string) => void;
	clearQuery?: boolean;
	defaultSelected?: OptionInterface[];
	defaultOpen?: boolean;
	defaultQuery?: string;
	refresh?: any;
}

export interface HeadlessSelectHook {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	query: string;
	setQuery: React.Dispatch<React.SetStateAction<string>>;
	selectedValues: OptionInterface[];
	setSelectedValues: React.Dispatch<React.SetStateAction<OptionInterface[]>>;
	filteredOptions: OptionInterface[];
	setFilteredOptions: React.Dispatch<React.SetStateAction<OptionInterface[]>>;
	addOrRemove: (multiple: boolean, option: OptionInterface) => void;
	outsideClickRef: React.MutableRefObject<any>;
}

export const useHeadlessSelectHook = ({
	options,
	valueKey,
	onChange,
	filterFunction,
	clearQuery,
	defaultSelected = [],
	defaultOpen = false,
	defaultQuery = "",
	refresh = "",
}: HeadlessSelectProps): HeadlessSelectHook => {
	const [open, setOpen] = useState<boolean>(defaultOpen);
	const [query, setQuery] = useState<string>(defaultQuery);
	const [selectedValues, setSelectedValues] =
		useState<OptionInterface[]>(defaultSelected);
	const [filteredOptions, setFilteredOptions] = useState<OptionInterface[]>([]);

	const outsideClickRef = useOutsideClicker(() => {
		setOpen(false);
	});

	const onTyping = useCallback(() => {
		if (query) {
			const val: any = options?.filter((ele: any) => {
				if (filterFunction) {
					return filterFunction(ele, query);
				} else {
					return (
						ele.label.toLowerCase().includes(query.toLowerCase()) ||
						ele.value.toLowerCase().includes(query.toLowerCase())
					);
				}
			});
			setFilteredOptions([...val]);
		} else {
			options && setFilteredOptions([...options]);
		}
	}, [query, options]);

	useDebounceEffect(onTyping, 200, [query]);

	useDidMountEffect(() => {
		setSelectedValues([]);
		onTyping();
	}, [refresh]);

	if (clearQuery) {
		useEffect(() => {
			!open && setQuery("");
		}, [open]);
	}

	const addOrRemove = useCallback(
		(multiple: boolean, option: any) => {
			if (!multiple) {
				setSelectedValues([option]);
				onChange && onChange(option);
				setOpen(false);
			} else {
				if (
					!selectedValues?.some(
						(current: any) => current[valueKey] === option[valueKey],
					)
				) {
					if (multiple) {
						onChange && onChange([...selectedValues, option]);
						setSelectedValues([...selectedValues, option]);
					}
				} else {
					let selectionAfterRemoval = selectedValues;
					selectionAfterRemoval = selectionAfterRemoval.filter(
						(current) => current[valueKey] !== option[valueKey],
					);
					onChange && onChange([...selectionAfterRemoval]);
					setSelectedValues([...selectionAfterRemoval]);
				}
			}
		},
		[selectedValues],
	);

	return {
		open,
		setOpen,
		query,
		setQuery,
		selectedValues,
		setSelectedValues,
		filteredOptions,
		setFilteredOptions,
		addOrRemove,
		outsideClickRef,
	};
};
