import React from "react";
import HeadlessBreadcrumbs from "./HeadlessBreadcrumbs";

interface ReusejsBreadcrumbsInterface {
	breadcrumbs: (React.ReactNode | string)[];
	separator?: React.ReactNode | string;
}

const HomeIcon = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="18"
			height="18"
			fill="none"
			viewBox="0 0 18 18"
		>
			<path
				fill="#374151"
				d="M17.099 7.91l-1.67-1.666L9.59.411a.835.835 0 00-1.18 0L2.57 6.244.9 7.911a.833.833 0 001.18 1.178l.244-.244v6.322a1.666 1.666 0 001.67 1.666h2.502A.835.835 0 007.331 16v-3.333a.833.833 0 01.834-.834h1.669a.835.835 0 01.834.834V16a.833.833 0 00.834.833h2.503a1.67 1.67 0 001.67-1.666V8.845l.244.244a.835.835 0 001.18-1.178z"
			></path>
		</svg>
	);
};

const defaultSeparator = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			height={20}
			width={20}
		>
			<path
				d="M15.54 11.29L9.88 5.64a1 1 0 00-1.42 0 1 1 0 000 1.41l4.95 5L8.46 17a1 1 0 000 1.41 1 1 0 00.71.3 1 1 0 00.71-.3l5.66-5.65a1 1 0 000-1.47z"
				fill="currentColor"
			></path>
		</svg>
	);
};

const ReusejsBreadcrumbs = ({
	breadcrumbs,
	separator,
}: ReusejsBreadcrumbsInterface) => {
	return (
		<div className="flex">
			<HomeIcon />
			<HeadlessBreadcrumbs
				breadcrumbs={breadcrumbs}
				separator={separator ? separator : defaultSeparator()}
				breadcrumbsClasses={
					"flex items-center bg-white text-gray-700 px-4 py-2 mt-10"
				}
				breadcrumbsContainerClasses={"flex items-center hover:text-blue-600"}
				separatorClasses={"px-2 text-gray-400"}
			/>
		</div>
	);
};

export default ReusejsBreadcrumbs;
