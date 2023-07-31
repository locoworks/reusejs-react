import React from "react";
import { ReusejsBreadcrumbs } from "@locoworks/reusejs-react-breadcrumbs";

const breadcrumbsOptions = ["Home", "Application", "Breadcrumbs"];

const SimpleBreadcrumbs = () => {
	return (
		<div className="flex flex-col items-center gap-x-3 justify-center py-10 border rounded bg-gray-50">
			<ReusejsBreadcrumbs
				breadcrumbs={breadcrumbsOptions}
				containerClasses={"flex items-center bg-white pl-2"}
			/>
		</div>
	);
};

export default SimpleBreadcrumbs;
