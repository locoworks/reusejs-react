import React, { useState } from "react";
import { ReuseButton } from "@locoworks/reusejs-react-button";
import { AnimatePresence, motion } from "framer-motion";

const HeadlessToastExample = () => {
	const [show, setShow] = useState(true);

	return (
		<div className="flex flex-col items-center gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
			<AnimatePresence>
				{/* {show ? (
					<motion.div
						key="Hello"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.5 }}
						className="w-56 h-32 bg-green-500"
					>
						Hello
					</motion.div>
				) : (
					<motion.div
						key="Bye"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.5 }}
						className="w-56 h-32 bg-red-500"
					>
						Bye
					</motion.div>
				)} */}
				{show && (
					<motion.div
						key="Hello"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.5 }}
						className="w-56 h-32 bg-green-500"
					>
						Hello
					</motion.div>
				)}
			</AnimatePresence>
			{/* <AnimatePresence> */}
			{!show && (
				<motion.div
					key="Bye"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.5 }}
					className="w-56 h-32 bg-red-500"
				>
					Bye
				</motion.div>
			)}
			{/* </AnimatePresence> */}
			<ReuseButton
				className="bg-blue-500 px-2 py-1 mt-3"
				onClick={() => {
					setShow(!show);
				}}
			>
				Show Change
			</ReuseButton>
		</div>
	);
};

export default HeadlessToastExample;
