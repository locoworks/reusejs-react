import React, { useState } from "react";
import Sidebar from "./Sidebar";
import GitHubIcon from "./GitHubIcon";
import Link from "next/link";
import { DocSearch } from "@docsearch/react";
import "@docsearch/css";
import SidebarIcon from "./SidebarIcon";

interface TocNode {
	depth: number;
	value: string;
	children: TocNode[];
}

interface SiteWrapperProps {
	children: React.ReactNode;
	toc?: TocNode[];
}
interface ListElementProps {
	margin: string;
	value: string;
	key_value: string;
}

const ListElement = ({ margin, value, key_value }: ListElementProps) => {
	return (
		<li className={"text-md font-light " + margin} key={key_value}>
			<a href={`#${value.toLowerCase().split(" ").join("-")}`}>
				<p className="overflow-hidden text-ellipsis whitespace-nowrap hover:underline">
					{value}
				</p>
			</a>
		</li>
	);
};

const renderToC = (toc: TocNode[]): any => {
	const components = toc
		.filter(
			(ele) => !ele.value.includes("title") && !ele.value.includes("author"),
		)
		.map((node: TocNode) => {
			if (node.value.includes("title") && node.value.includes("author")) return;
			let listElement;

			switch (node.depth) {
				case 1:
					listElement = (
						<ListElement
							key={node.depth + node.value}
							key_value={node.depth + node.value}
							margin=""
							value={node.value}
						/>
					);
					break;
				case 2:
					listElement = (
						<ListElement
							key={node.depth + node.value}
							key_value={node.depth + node.value}
							margin={"ml-2"}
							value={node.value}
						/>
					);
					break;
				case 3:
					listElement = (
						<ListElement
							key={node.depth + node.value}
							key_value={node.depth + node.value}
							margin={"ml-4"}
							value={node.value}
						/>
					);
					break;
				case 4:
					listElement = (
						<ListElement
							key={node.depth + node.value}
							key_value={node.depth + node.value}
							margin="ml-6"
							value={node.value}
						/>
					);
					break;
				case 5:
					listElement = (
						<ListElement
							key={node.depth + node.value}
							key_value={node.depth + node.value}
							margin="ml-8"
							value={node.value}
						/>
					);
					break;
				case 6:
					listElement = (
						<ListElement
							key={node.depth + node.value}
							key_value={node.depth + node.value}
							margin="ml-10"
							value={node.value}
						/>
					);
					break;
				default:
					listElement = (
						<ListElement
							key={node.depth + node.value}
							key_value={node.depth + node.value}
							margin=""
							value={node.value}
						/>
					);
			}
			if (node.children) {
				return (
					<>
						{listElement}
						{renderToC(node.children)}
					</>
				);
			}
			return listElement;
		});
	return components;
};

export default function SiteWrapper({ children, toc }: SiteWrapperProps) {
	const [isSidebarOpen, setisSidebarOpen] = useState<boolean>(false);

	let touchStartX = 0;

	const handleTouchStart = (e: React.TouchEvent) => {
		touchStartX = e.touches[0].clientX;
	};

	const handleTouchMove = (e: React.TouchEvent) => {
		const touchCurrentX = e.touches[0].clientX;
		const touchDeltaX = touchCurrentX - touchStartX;

		if (touchStartX < 150 && touchDeltaX > 30) {
			setisSidebarOpen((prev) => !prev);
		}
	};

	const handleContentClick = () => {
		if (isSidebarOpen) {
			setisSidebarOpen(false);
		}
	};

	return (
		<main className="h-screen">
			<div className="z-10 h-[6%] flex items-center py-5 pl-5 lg:pl-10 pr-4 justify-between border border-[#5501BF36] bg-white">
				<div
					className="flex pl-0 pr-4 lg:hidden"
					onClick={() => setisSidebarOpen((prev) => !prev)}
				>
					<SidebarIcon />
				</div>
				<label className="text-lg text-[#5501BF] cursor-pointer">
					<Link href={"/"}>
						<span className="font-bold">LOCO</span>WORKS
					</Link>
				</label>
				<div className="flex gap-x-10">
					<DocSearch
						appId="TNDA5WN0U4"
						indexName="locoworks"
						apiKey="67c042b54d4806a1428f1ab491af1cd7"
					/>
					<Link
						href={"https://github.com/locoworks/reusejs-react"}
						target="_blank"
					>
						<GitHubIcon />
					</Link>
				</div>
			</div>

			<div
				className="flex h-[94%]"
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
			>
				<div
					className={`${
						isSidebarOpen
							? "flex flex-col z-40 fixed left-0 bg-white w-[75%]"
							: "hidden"
					}
					lg:flex lg:flex-col md:w-[20%] lg:z-0 h-full border-r border-[#5501BF36] px-2 pt-10`}
				>
					<Sidebar />
				</div>
				<div
					className="w-full lg:w-[58%] overflow-scroll px-2"
					onClick={handleContentClick}
				>
					{children}
				</div>
				<div className="hidden lg:flex w-[22%] bg-[#b99cdc36] flex-col px-2 pt-10">
					<label className="font-bold text-md">Table of Contents</label>
					<ul className="ml-2 list-image-[`#`]">{toc && renderToC(toc)}</ul>
				</div>
			</div>
		</main>
	);
}
