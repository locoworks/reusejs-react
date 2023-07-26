/* eslint-disable react/display-name */
import React from "react";
import {
	useOutsideClicker,
	useMountComponent as mountComponent,
	useClosableComponent as Closable,
} from "@locoworks/reusejs-toolkit-react-hooks";
import { twMerge } from "tailwind-merge";

const ModalBase = React.forwardRef((props: any, ref: any) => {
	const visRef = useOutsideClicker(() => {
		props.onAction(false);
	});
	console.log(">>>>>PROPS", props);

	const defaultBackdropClasses =
		"fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-50 flex justify-center items-center";

	return (
		<div className={twMerge(defaultBackdropClasses, props.backdropClasses)}>
			<div ref={visRef} className="relative">
				{props.component(props, ref)}
			</div>
		</div>
	);
});

function HeadlessModal(config: any, unmountDelay = 0, mountingNode?: any) {
	if (config.timeout === undefined) {
		config.timeout = 0;
	}
	return mountComponent(
		Closable(ModalBase),
		unmountDelay,
		mountingNode,
	)(config);
}

export default HeadlessModal;
