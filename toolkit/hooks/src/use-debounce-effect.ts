/**
 * Custom hook for creating a debounce effect in React.
 *
 * @param {Function} callback - The callback function to be executed after the debounce delay.
 * @param {number} delay - The debounce delay in milliseconds.
 * @param {Array} deps - An array of dependencies that determines when the effect should re-run.
 */
import React from "react";
import { useIsoMorphicEffect } from "./use-iso-morphic-effect";

export const useDebounceEffect = (
	callback: React.EffectCallback,
	delay: number,
	deps: React.DependencyList,
) => {
	useIsoMorphicEffect(() => {
		const debounceTimer = setTimeout(() => {
			callback();
		}, delay);
		return () => clearTimeout(debounceTimer);
	}, deps);
};
