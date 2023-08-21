import React, { useState, useEffect } from "react";

/**
 * Higher-Order Component (HOC) that adds closable behavior to a wrapped component.
 * Automatically closes the wrapped component after a specified timeout (optional).
 * @param {React.Component} Component - The component to be wrapped with closable behavior.
 * @returns {React.Component} - The enhanced component with closable behavior.
 */

const Closable = (Component: any) => {
	/**
	 * Closable component that wraps the provided component and adds closable behavior to it.
	 * @param {Object} props - Props to be passed to the wrapped component.
	 * @param {number} [props.timeout=3000] - Time in milliseconds before the component automatically closes.
	 * Set to 0 to disable the timeout feature.
	 * @param {Function} props.resolve - Callback function to be executed when the component closes.
	 * The callback is invoked with a single argument indicating if the component was closed
	 * due to the timeout (true) or manually (false).
	 * @returns {JSX.Element} - The JSX representing the wrapped component with closable behavior.
	 */
	// eslint-disable-next-line react/display-name
	return ({ ...props }) => {
		/**
		 * State that determines the visibility of the wrapped component.
		 * @type {boolean}
		 */
		const [visible, setVisible] = useState(true);

		useEffect(() => {
			// If timeout is provided and not set to 0, automatically close the component after the specified timeout
			if (props.timeout !== 0) {
				setTimeout(() => {
					onAction(true);
				}, props.timeout || 3000);
			}
		});

		/**
		 * Callback function to close the wrapped component.
		 * Invokes the resolve callback with the appropriate value (true for timeout, false for manual closure).
		 * @param {boolean} value - Indicates if the component is closed due to the timeout (true) or manual action (false).
		 */
		const onAction = (value: any) => {
			setVisible(false);
			props.resolve(value);
		};

		return <Component onAction={onAction} visible={visible} {...props} />;
	};
};

export default Closable;
