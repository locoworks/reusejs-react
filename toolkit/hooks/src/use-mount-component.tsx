import React from "react";
import { createRoot } from "react-dom/client";

/**
 * Function that mounts a React component into the DOM, providing control over the mount node and unmounting behavior.
 * @param {React.ComponentType<any>} Component - The component to be mounted.
 * @param {number} [unmountDelay=1000] - The delay in milliseconds before unmounting the component after resolving or rejecting the promise.
 * @param {string} [mountingNode] - The ID of the DOM element where the component will be mounted. If not provided, the component will be appended to the document body.
 * @param {("div"|"label"|"span"|"button")} [as="div"] - The HTML tag name to use when creating the mount node.
 * @returns {Function} - A function that takes component props and returns a promise that resolves with the result of the component rendering.
 */
const mountComponent = (
	Component: any,
	unmountDelay = 1000,
	mountingNode?: any,
	as?: "div" | "label" | "span" | "button",
) => {
	return (props: any) => {
		let wrapper: any;
		const mountAs = as || "div";

		if (mountingNode === undefined) {
			wrapper = document.body.appendChild(document.createElement(mountAs));
		} else {
			if (document !== null && document !== undefined) {
				const existingNode = document.getElementById(mountingNode);
				if (existingNode !== null) {
					wrapper = existingNode.appendChild(document.createElement(mountAs));
				}
			}
		}

		const root = createRoot(wrapper);

		const promise = new Promise((resolve, reject) => {
			try {
				root.render(
					<Component
						reject={reject}
						resolve={resolve}
						dispose={dispose}
						{...props}
					/>,
				);
			} catch (e) {
				console.log("Component not mounted form mountComponent hook");
				throw e;
			}
		});

		function dispose() {
			setTimeout(() => {
				root.unmount();
				setTimeout(() => {
					if (wrapper && wrapper.parentNode) {
						wrapper.parentNode.removeChild(wrapper);
					}
				});
			}, unmountDelay);
		}

		return promise.then(
			(result) => {
				dispose();
				return result;
			},
			(result) => {
				dispose();
				return Promise.reject(result);
			},
		);
	};
};

export default mountComponent;
