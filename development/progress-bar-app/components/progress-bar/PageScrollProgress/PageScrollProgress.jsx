import React, { useState, useEffect, useRef } from "react";
import { useProgress } from "@locoworks/reusejs-toolkit-react-hooks";

const PageScrollProgress = () => {
	const [scrollValue, setScrollValue] = useState(0);
	const [running, setRunning] = useState(false);

	const scrollRef = useRef(null);
	let scrollContainer = scrollRef.current;

	const handleScroll = (event) => {
		if (!running) {
			setRunning(true);
		}
		const divScrollTop = event.target.scrollTop;
		setScrollValue(divScrollTop);
	};

	const { progress } = useProgress({
		totalFileSize: 0,
		processedFileSize: scrollValue,
		running: running,
		progressLoop: true, // to Implement PageScroll Progress Feature it must be passed as true.
	});

	useEffect(() => {
		scrollContainer = scrollRef.current;
		const totalHeight = scrollContainer?.scrollHeight;
		const viewAreaHeight = scrollContainer?.offsetHeight;
		console.log(totalHeight - viewAreaHeight);
	}, []);

	return (
		<div className="flex relative items-center gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
			<div
				className="flex absolute bg-red-500 left-0 top-0 h-1"
				style={{ width: `${progress}%` }}
			></div>
			<div
				className="relative flex flex-col w-full max-h-96 items-center overflow-x-auto"
				onScroll={handleScroll}
				ref={scrollRef}
			>
				<div className="flex flex-col text-center justify-center items-center w-full">
					<p className="flex text-center font-semibold text-xl  my-2">
						{`Lorem Ipsum is simply dummy text of the printing and typesetting
						industry. Lorem Ipsum has been the industry's standard dummy text
						ever since the 1500s, when an unknown printer took a galley of type
						and scrambled it to make a type specimen book. It has survived not
						only five centuries, but also the leap into electronic typesetting,
						remaining essentially unchanged. It was popularised in the 1960s
						with the release of Letraset sheets containing Lorem Ipsum passages,
						and more recently with desktop publishing software like Aldus
						PageMaker including versions of Lorem Ipsum.`}
					</p>
					<p className="flex text-center font-semibold text-xl  my-2">
						{`Lorem Ipsum is simply dummy text of the printing and typesetting
						industry. Lorem Ipsum has been the industry's standard dummy text
						ever since the 1500s, when an unknown printer took a galley of type
						and scrambled it to make a type specimen book. It has survived not
						only five centuries, but also the leap into electronic typesetting,
						remaining essentially unchanged. It was popularised in the 1960s
						with the release of Letraset sheets containing Lorem Ipsum passages,
						and more recently with desktop publishing software like Aldus
						PageMaker including versions of Lorem Ipsum.`}
					</p>
					<p className="flex text-center font-semibold text-xl  my-2">
						{`Lorem Ipsum is simply dummy text of the printing and typesetting
						industry. Lorem Ipsum has been the industry's standard dummy text
						ever since the 1500s, when an unknown printer took a galley of type
						and scrambled it to make a type specimen book. It has survived not
						only five centuries, but also the leap into electronic typesetting,
						remaining essentially unchanged. It was popularised in the 1960s
						with the release of Letraset sheets containing Lorem Ipsum passages,
						and more recently with desktop publishing software like Aldus
						PageMaker including versions of Lorem Ipsum.`}
					</p>
					<p className="flex text-center font-semibold text-xl  my-2">
						{`Lorem Ipsum is simply dummy text of the printing and typesetting
						industry. Lorem Ipsum has been the industry's standard dummy text
						ever since the 1500s, when an unknown printer took a galley of type
						and scrambled it to make a type specimen book. It has survived not
						only five centuries, but also the leap into electronic typesetting,
						remaining essentially unchanged. It was popularised in the 1960s
						with the release of Letraset sheets containing Lorem Ipsum passages,
						and more recently with desktop publishing software like Aldus
						PageMaker including versions of Lorem Ipsum.`}
					</p>
					<p className="flex text-center font-semibold text-xl  my-2">
						{`Lorem Ipsum is simply dummy text of the printing and typesetting
						industry. Lorem Ipsum has been the industry's standard dummy text
						ever since the 1500s, when an unknown printer took a galley of type
						and scrambled it to make a type specimen book. It has survived not
						only five centuries, but also the leap into electronic typesetting,
						remaining essentially unchanged. It was popularised in the 1960s
						with the release of Letraset sheets containing Lorem Ipsum passages,
						and more recently with desktop publishing software like Aldus
						PageMaker including versions of Lorem Ipsum.`}
					</p>
					<p className="flex text-center font-semibold text-xl  my-2">
						{`Lorem Ipsum is simply dummy text of the printing and typesetting
						industry. Lorem Ipsum has been the industry's standard dummy text
						ever since the 1500s, when an unknown printer took a galley of type
						and scrambled it to make a type specimen book. It has survived not
						only five centuries, but also the leap into electronic typesetting,
						remaining essentially unchanged. It was popularised in the 1960s
						with the release of Letraset sheets containing Lorem Ipsum passages,
						and more recently with desktop publishing software like Aldus
						PageMaker including versions of Lorem Ipsum.`}
					</p>
				</div>
			</div>
		</div>
	);
};

export default PageScrollProgress;
