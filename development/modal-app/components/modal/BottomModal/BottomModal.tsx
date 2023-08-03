/* eslint-disable react/display-name */
import React, { useState } from "react";
import { HeadlessModal } from "@locoworks/reusejs-react-modal";
import { ReuseButton } from "@locoworks/reusejs-react-button";
import HandleIcon from "../icons/HandleIcon";

const BottomModal = () => {
	const Modal = React.forwardRef((props: any, ref: any) => {
		const [full, setFull] = useState(false);
		return (
			<div
				ref={ref}
				className={
					"w-screen bottom-0 bg-white rounded-t-xl flex flex-col items-center py-3 gap-y-3 transition-all " +
					(full ? " h-screen" : " max-h-[90vh] h-fit ")
				}
			>
				<div
					className={"w-fit h-fit cursor-pointer " + (full ? "" : "rotate-180")}
					onClick={() => {
						setFull(!full);
					}}
				>
					<HandleIcon />
				</div>
				<div className="h-[1px] w-full bg-[#DEDEDE]" />
				<div className="px-4 overflow-y-scroll">
					<h2 className="text-2xl font-bold hover:underline cursor-pointer w-fit">
						What is Lorem Ipsum?
					</h2>
					<p>
						<span className="font-bold">{`Lorem Ipsum`}</span>
						{` is simply dummy text of
					the printing and typesetting industry. Lorem Ipsum has been the
					industry's standard dummy text ever since the 1500s, when an unknown
					printer took a galley of type and scrambled it to make a type specimen
					book. It has survived not only five centuries, but also the leap into
					electronic typesetting, remaining essentially unchanged. It was
					popularised in the 1960s with the release of Letraset sheets
					containing Lorem Ipsum passages, and more recently with desktop
					publishing software like Aldus PageMaker including versions of Lorem
					Ipsum.`}
					</p>
					<h2 className="text-2xl font-bold mt-2 hover:underline cursor-pointer w-fit">
						Why do we use it?
					</h2>
					<p>
						{`It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).`}
					</p>
				</div>
			</div>
		);
	});

	const showModal = async () => {
		const result = await HeadlessModal({
			component: Modal,
			backdropClasses: "bg-black bg-opacity-90",
			inputValues: {
				input: "Hello",
			},
			modalWrapperClasses: "absolute bottom-0",
			animations: {
				modal: {
					initial: { opacity: 0, y: 400 },
					animate: { opacity: 1, y: 0 },
					exit: { opacity: 0, y: 400 },
					transition: { ease: "easeIn" },
				},
			},
		});
		console.log(result);
	};

	return (
		<div className="flex flex-col items-center gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
			<ReuseButton className="bg-blue-500 px-2 py-1 mt-3" onClick={showModal}>
				Open modal
			</ReuseButton>
		</div>
	);
};

export default BottomModal;
