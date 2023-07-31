import React, { CSSProperties, useState } from "react";

interface HeadlessBreadcrumbsInterface {
	breadcrumbs: (React.ReactNode | string)[];
	separator: React.ReactNode | string;
	breadcrumbsClasses?: string | CSSProperties;
	breadcrumbsContainerClasses?: string | CSSProperties;
	separatorClasses?: string | CSSProperties;
	maxItems?: number;
}

const HeadlessBreadcrumbs = ({
	breadcrumbs,
	separator,
	breadcrumbsClasses,
	breadcrumbsContainerClasses,
	separatorClasses,
	maxItems = breadcrumbs.length,
}: HeadlessBreadcrumbsInterface) => {
	const [maxItemShow, setMaxItemShow] = useState<number>(maxItems);

	return (
		<div
			className={
				typeof breadcrumbsClasses === "string" ? breadcrumbsClasses : ""
			}
			style={typeof breadcrumbsClasses === "object" ? breadcrumbsClasses : {}}
		>
			{maxItemShow === breadcrumbs.length || maxItemShow < 2
				? breadcrumbs.map((item: React.ReactNode, index: number) => {
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
											typeof separatorClasses === "string"
												? separatorClasses
												: ""
										}
										style={
											typeof separatorClasses === "object"
												? separatorClasses
												: {}
										}
									>
										{separator}
									</div>
								) : null}
							</div>
						);
				  })
				: breadcrumbs.map((item: React.ReactNode, index: number) => {
						return index < maxItemShow - 1 ? (
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
								{item}
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
							</div>
						) : index === breadcrumbs.length - 1 ? (
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
								onClick={() => setMaxItemShow(breadcrumbs.length)}
							>
								...
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
								{item}
							</div>
						) : null;
				  })}
		</div>
	);
};

export default HeadlessBreadcrumbs;
