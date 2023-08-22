import React from "react";
import {
	useMountComponent,
	useClosable as Closable,
} from "@locoworks/reusejs-toolkit-react-hooks";

export interface HeadlessToastProps {
	timeout: number;
	component: React.ReactNode;
}

const ToastWrapper: any = ({ timeout, component }: HeadlessToastProps) => {
	const Exportable = () => {
		return (
			<div
				key={JSON.stringify(new Date())}
				className="fixed top-0 left-0 w-screen h-full h-screen pointer-events-none"
			>
				{component}
			</div>
		);
	};
	return useMountComponent(
		Closable(Exportable),
		10,
	)({ timeout: timeout - 200 || 0 });
};

export default ToastWrapper;
