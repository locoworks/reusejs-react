import React, { useEffect, useState, useRef } from "react";

/* This is for selecting how the component will be removed from the DOM on hidding banner.
 * There are  two possibilities for how to do so:
 * - Hide the component and still keep it in DOM but with visibility none
 * - Remove the element completely from the DOM
 * By default the banner is UNMOUNTED on hiding the component from the DOM
 */
export enum RenderingStrategyEnum {
	UNMOUNT = "UNMOUNT",
	HIDDEN = "HIDDEN",
}

export enum DisplayEnum {
	NONE = "none",
	FLEX = "flex",
	BLOCK = "block",
	INLINE = "inline",
	INLINEBLOCK = "inline-block",
}

interface ChildrenPropsInterface {
	hideBanner: () => void;
	isHidden: boolean;
	eleRef: React.MutableRefObject<HTMLElement | null | undefined>;
}

export interface HeadlessBannerProps {
	showBanner?: boolean;
	renderingStrategy?: RenderingStrategyEnum;
	children?: (ChildrenPropsInterface: ChildrenPropsInterface) => JSX.Element;
	outsideStateControl?: boolean;
	wrapperDisplay?: DisplayEnum;
}

const HeadlessBanner = ({
	showBanner = true,
	renderingStrategy = RenderingStrategyEnum.UNMOUNT,
	children,
	outsideStateControl = true,
	wrapperDisplay = DisplayEnum.FLEX,
}: HeadlessBannerProps) => {
	const [display, setDisplay] = useState(showBanner);

	const eleRef = useRef<HTMLElement | null>();

	const initWithRenderStrategyHidden = () => {
		if (renderingStrategy === RenderingStrategyEnum.HIDDEN && eleRef.current) {
			if (display) {
				eleRef.current.style.display = wrapperDisplay;
			} else {
				eleRef.current.style.display = DisplayEnum.NONE;
			}
		}
	};

	useEffect(() => {
		initWithRenderStrategyHidden();
	}, []);

	useEffect(() => {
		if (outsideStateControl) {
			setDisplay(showBanner);
		}
	}, [showBanner]);

	useEffect(() => {
		if (renderingStrategy === RenderingStrategyEnum.HIDDEN) {
			initWithRenderStrategyHidden();
		}
	}, [display]);

	const toggleChildDisplay = () => {
		if (eleRef.current) {
			if (eleRef.current.style.display === DisplayEnum.NONE) {
				eleRef.current.style.display = wrapperDisplay;
				setDisplay(true);
			} else {
				eleRef.current.style.display = DisplayEnum.NONE;
				setDisplay(false);
			}
		} else {
			console.log("Selected element is not an instance of HTMLElement");
		}
	};

	const handleBannerClose = () => {
		if (renderingStrategy === RenderingStrategyEnum.UNMOUNT) {
			setDisplay(false);
		} else if (renderingStrategy === RenderingStrategyEnum.HIDDEN) {
			toggleChildDisplay();
		} else {
			console.log(
				"No rendering strategy selected!! This should not be possible!!",
			);
		}
	};

	const childrenProps = {
		hideBanner: handleBannerClose,
		isHidden: !display,
		eleRef: eleRef,
	};

	return (
		<>
			{(renderingStrategy === RenderingStrategyEnum.HIDDEN || display) &&
				children &&
				children(childrenProps)}
		</>
	);
};

export default HeadlessBanner;
