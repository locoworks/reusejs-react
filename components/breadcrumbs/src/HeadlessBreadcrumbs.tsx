import React, { CSSProperties } from "react";

interface HeadlessBreadcrumbsInterface {
	breadcrumbs: (React.ReactNode | string)[];
	separator: React.ReactNode | string;
	breadcrumbsClasses?: string | CSSProperties;
	breadcrumbsContainerClasses?: string | CSSProperties;
	separatorClasses?: string | CSSProperties;
}

const HeadlessBreadcrumbs = ({
	breadcrumbs,
	separator,
	breadcrumbsClasses,
	breadcrumbsContainerClasses,
	separatorClasses,
}: HeadlessBreadcrumbsInterface) => {
	return (
		<div
			className={
				typeof breadcrumbsClasses === "string" ? breadcrumbsClasses : ""
			}
			style={typeof breadcrumbsClasses === "object" ? breadcrumbsClasses : {}}
		>
			{breadcrumbs.map((item: React.ReactNode, index: number) => {
				return (
					<div
						key={index}
						className={
							typeof breadcrumbsContainerClasses === "string"
								? breadcrumbsContainerClasses
								: ""
						}
						style={
							typeof breadcrumbsContainerClasses === "object"
								? breadcrumbsContainerClasses
								: {}
						}
					>
						{item}{" "}
						{index < breadcrumbs.length - 1 ? (
							<div
								className={
									typeof separatorClasses === "string" ? separatorClasses : ""
								}
								style={
									typeof separatorClasses === "object" ? separatorClasses : {}
								}
							>
								{separator}
							</div>
						) : (
							""
						)}
					</div>
				);
			})}
		</div>
	);
};

export default HeadlessBreadcrumbs;
