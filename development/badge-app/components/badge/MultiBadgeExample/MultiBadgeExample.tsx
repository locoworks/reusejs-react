import React from "react";
import { ReuseBadge } from "@locoworks/reusejs-react-badge";
import InfoIcon from "../icons/info";

const MultiBadgeExample = () => {
	const uiConfigs = {
		primary: {
			className: "border border-blue-700 text-blue-700 px-3 py-1 bg-blue-200",
			label: "Primary",
		},
		secondary: {
			className:
				"border border-violet-700 text-violet-700 px-3 py-1 bg-violet-200",
			label: "Secondary",
		},
		warning: {
			className:
				"border border-yellow-700 text-yellow-700 px-3 py-1 bg-yellow-200",
			label: "Warning!!",
		},
		success: {
			className:
				"border border-green-700 text-green-700 px-3 py-1 bg-green-200",
			label: "Success!!",
		},
		error: {
			className: "border border-red-700 text-red-700 px-3 py-1 bg-red-200",
			label: "Error!!",
		},
		info: {
			className:
				"border border-blue-700 text-blue-700 px-3 py-1 bg-blue-200 flex items-center justify-center gap-x-2",
			label: "Info!!",
			prefixIcon: <InfoIcon />,
		},
	};
	return (
		<div className="flex items-center gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
			<ReuseBadge
				className={uiConfigs["primary"]["className"]}
				label={uiConfigs["primary"]["label"]}
			/>
			<ReuseBadge
				className={uiConfigs["secondary"]["className"]}
				label={uiConfigs["secondary"]["label"]}
			/>
			<ReuseBadge
				className={uiConfigs["success"]["className"]}
				label={uiConfigs["success"]["label"]}
			/>
			<ReuseBadge
				className={uiConfigs["warning"]["className"]}
				label={uiConfigs["warning"]["label"]}
			/>
			<ReuseBadge
				className={uiConfigs["error"]["className"]}
				label={uiConfigs["error"]["label"]}
			/>
			<ReuseBadge
				className={uiConfigs["info"]["className"]}
				label={uiConfigs["info"]["label"]}
				prefixIcon={uiConfigs["info"]["prefixIcon"]}
			/>
		</div>
	);
};

export default MultiBadgeExample;
