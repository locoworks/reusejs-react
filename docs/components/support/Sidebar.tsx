import React, { useState } from "react";
import ComponentData from "../../../data/sidemenu_data.json";
import ChevronRight from "./ChevronRight";
import ChevronDown from "./ChevronDown";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

type MyObject = {
	[key: string]: string[]; // Add an index signature for string keys
};

interface SideBarSectionProps {
	arr: string[];
	heading: string;
}

function lowercaseFirstLetter(string: string) {
	return string.charAt(0).toLowerCase() + string.slice(1);
}

function returnVal(pathname: string) {
	if (pathname.includes("/hooks")) return "hooks";
	if (pathname.includes("/utils")) return "utils";
	if (pathname === "/reusejs-react") return "home";
	return "components";
}

const SideBarSection: React.FC<SideBarSectionProps> = ({ arr, heading }) => {
	const router = useRouter();
	const [open, setOpen] = useState(
		returnVal(router.pathname) === heading.toLowerCase(),
	);
	return (
		<div className="mb-3">
			<div
				className={
					"flex justify-between items-center cursor-pointer bg-[#f4f0f8] h-12 rounded px-4 transition-all mb-3"
				}
				onClick={() => setOpen(!open)}
			>
				<h1 className="w-fit">{heading}</h1>

				{open ? <ChevronDown /> : <ChevronRight />}
			</div>
			<AnimatePresence>
				{open &&
					arr.map((val, index) => {
						let route = "";
						heading === "Components"
							? (route = "/" + val.split(" ").join("-").toLowerCase())
							: heading === "Hooks"
							? (route = "/hooks/" + lowercaseFirstLetter(val))
							: (route = "/utils/" + val);
						return (
							<motion.div
								initial={{ opacity: 0, x: -200 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -200 }}
								transition={{ delay: index * 0.1 }}
								key={"ele" + index}
								className=" hover:bg-[#5501BF36] mb-2"
							>
								<h2 className="ml-6 w-fit cursor-pointer">
									<Link href={"/reusejs-react" + route}>{val}</Link>
								</h2>
							</motion.div>
						);
					})}
			</AnimatePresence>
		</div>
	);
};

export default function Sidebar() {
	const data: MyObject = ComponentData;

	return (
		<>
			{Object.keys(data).map((sectionKey: string, index) => {
				return (
					<SideBarSection
						key={index + "heading"}
						arr={data[sectionKey]}
						heading={sectionKey}
					/>
				);
			})}
		</>
	);
}
