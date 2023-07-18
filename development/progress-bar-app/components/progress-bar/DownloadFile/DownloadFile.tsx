import React, { useState, useRef, useEffect } from "react";
import { ProgressBar } from "@locoworks/reusejs-react-progress-bar";
import { ReuseButton } from "@locoworks/reusejs-react-button";

const DownloadFile = () => {
	const [running, setRunning] = useState<boolean>(false);
	const [processedFile, setProcessedFile] = useState<number>(0);

	const processedFileRef = useRef<NodeJS.Timeout | null>(null);
	const StartUploadDownload = () => {
		clearInterval(processedFileRef.current as NodeJS.Timeout);
		processedFileRef.current = setInterval(() => {
			setProcessedFile((previousValue) => {
				return previousValue + 10;
			});
		}, 10);
	};

	useEffect(() => {
		if (processedFile === 5000) {
			clearInterval(processedFileRef.current as NodeJS.Timeout);
		}
	}, [processedFile]);
	return (
		<div className="flex items-center gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
			<div className="w-full h-72 flex flex-col justify-center items-center mx-80">
				<ProgressBar
					progressInterval={2000}
					running={running}
					defaultProgress={0}
					progressContainerClasses="bg-gray-200 h-6 flex"
					progressClasses="bg-green-600 h-full"
					processedFileSize={processedFile}
					totalFileSize={5000}
					progressText={(progress: number) => `Downloaded ${progress}%`}
					progressTextClasses="text-xl font-normal justify-self-center"
				/>
				<ReuseButton
					className="bg-blue-500 text-white font-bold text-2xl text-center mt-20 px-6 flex"
					onClick={() => {
						setRunning(true);
						StartUploadDownload();
					}}
				>
					Start File Download
				</ReuseButton>
			</div>
		</div>
	);
};

export default DownloadFile;
