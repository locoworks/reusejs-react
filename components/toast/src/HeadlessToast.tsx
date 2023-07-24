import React from "react";
import ToastWrapper from "./ToastWrapper";

export interface HeadlessToastProps {
	timeout: number;
	component: React.ReactNode;
}

const HeadlessToast: any = ({ timeout, component }: HeadlessToastProps) => {
	return ToastWrapper({ timeout, component });
};

export default HeadlessToast;
