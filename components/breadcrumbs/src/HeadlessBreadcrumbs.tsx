import React, { CSSProperties, useState } from "react";

interface HeadlessBreadcrumbsInterface {
	breadcrumbs: (React.ReactNode | string)[];
	separator: React.ReactNode | string;
	breadcrumbsClasses?: string | CSSProperties;
	breadcrumbsContainerClasses?: string | CSSProperties;
	separatorClasses?: string | CSSProperties;
	maxItems?: number;
	left?: number;
	right?: number;
}

const HeadlessBreadcrumbs = ({
	breadcrumbs,
	separator,
	breadcrumbsClasses,
	breadcrumbsContainerClasses,
	separatorClasses,
	maxItems = breadcrumbs.length,
	left = -1,
	right = -1,
}: HeadlessBreadcrumbsInterface) => {
	const [maxItemShow, setMaxItemShow] = useState<number>(maxItems);

	return (
		<div
			className={
				typeof breadcrumbsClasses === "string" ? breadcrumbsClasses : ""
			}
			style={typeof breadcrumbsClasses === "object" ? breadcrumbsClasses : {}}
		>
			{maxItemShow === breadcrumbs.length ||
			maxItemShow < 2 ||
			left < 1 ||
			right < 1 ||
			maxItemShow !== left + right
				? breadcrumbs.map((item: React.ReactNode, index: number) => {
						return (
							<div
								onClick={() => setMaxItemShow(maxItems)}
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
				: left + right < breadcrumbs.length && left + right === maxItemShow
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
								{index < left ? (
									<>
										{item}{" "}
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
									</>
								) : null}
								{index === left ? (
									<div
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
									</div>
								) : null}
								{index >= breadcrumbs.length - right &&
								index < breadcrumbs.length - 1 ? (
									<>
										{item}{" "}
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
									</>
								) : index > left + 1 && index === breadcrumbs.length - 1 ? (
									item
								) : null}
							</div>
						);
				  })
				: ""}
		</div>
	);
};

export default HeadlessBreadcrumbs;
