import React, { useCallback, useEffect, useRef, useState } from "react";
import useTimer from "./useTimer";

interface HeadessVideoRecorderProps {
	autoStop?: boolean;
	timeInMs?: number;
}
type VideoMimeTypes = "video/mp4" | "video/webm";

const HeadessVideoRecorder: React.FC<HeadessVideoRecorderProps> = ({
	autoStop = false,
	timeInMs = 15000,
	// ...props
}) => {
	const [recording, setRecording] = useState("preview");

	const videoRef = useRef<HTMLVideoElement>(null);
	const playbackRef = useRef<HTMLVideoElement>(null);
	const mediaRecorderRef = useRef<MediaRecorder | null>(null);

	const recordingTime = timeInMs;

	const timer = useTimer();
	const isSupportedMimeType = (mimeTypes: VideoMimeTypes[]) => {
		const result: VideoMimeTypes[] = [];
		mimeTypes.forEach((mimeType) => {
			if (
				typeof MediaRecorder !== "undefined" &&
				MediaRecorder.isTypeSupported(mimeType)
			) {
				result.push(mimeType);
			}
		});
		return result.length === 0 ? undefined : result[0];
	};

	const supportedMimeType = isSupportedMimeType(["video/mp4", "video/webm"]);
	const mimeType = supportedMimeType;
	const blobType = supportedMimeType;
	// const fileExtension = supportedMimeType?.split("/")[1];

	const showPreview = useCallback(async () => {
		try {
			// setLoading(true);
			const stream = await navigator.mediaDevices.getUserMedia({
				video: {
					width: { ideal: 640, max: 640 },
					height: { ideal: 480, max: 480 },
					facingMode: "user",
					frameRate: { ideal: 15, max: 30 },
				},
				audio: true,
			});
			if (videoRef.current) {
				videoRef.current.srcObject = stream;
				videoRef.current.onloadedmetadata = () => {
					// setLoading(false);
					console.log("Loading false");
				};
			}
			// console.log("Show Preview");
		} catch (error) {
			console.log(error, "Preview Error__");
		}
	}, []);

	useEffect(() => {
		showPreview();
	}, [showPreview]);

	const wait = (delayInMS: number) => {
		return new Promise((resolve) => setTimeout(resolve, delayInMS));
	};

	const record = async (stream: MediaStream, lengthInMs: number) => {
		const recorder = new MediaRecorder(stream, {
			mimeType,
			videoBitsPerSecond: 2500000,
		});
		mediaRecorderRef.current = recorder;
		const data: Blob[] = [];

		recorder.ondataavailable = (event) => {
			data.push(event.data);
		};

		recorder.start();

		timer.start(lengthInMs / 1000);
		const recorded = await wait(lengthInMs);

		if (recorder.state === "recording") {
			recorder.stop();
			timer.stop();
		}
		const stopped = new Promise((resolve, reject) => {
			recorder.onstop = resolve;
			recorder.onerror = (event) => {
				timer.stop();
				reject(event);
			};
		});

		try {
			await Promise.all([stopped, recorded]);
			return data;
		} catch (error) {
			timer.stop();
			console.log(error);
		}
	};

	const stopPreviewStream = () => {
		// stop input stream
		if (videoRef.current?.srcObject instanceof MediaStream) {
			const stream = videoRef.current?.srcObject;
			stream?.getTracks().forEach((track) => track.stop());
		}
	};

	const onStopMediaStream = (recordedChunks: Blob[] | undefined) => {
		const recorderBlob = new Blob(recordedChunks, { type: blobType });
		const videoSrc = URL.createObjectURL(recorderBlob);
		// console.log(videoSrc, "___VideoSrc__");

		// const extension = fileExtension;
		// const recordedFile = new File([recorderBlob],`video.${extension}`, {
		//     type : extension
		// });

		if (playbackRef.current) {
			playbackRef.current.src = videoSrc;
		}
	};

	const handleStartRecording = async () => {
		try {
			if (autoStop) {
				setRecording("recording");
				if (videoRef.current?.srcObject instanceof MediaStream) {
					const recordedChunks: Blob[] | undefined = await record(
						videoRef.current?.srcObject,
						recordingTime,
					);
					onStopMediaStream(recordedChunks);
					setRecording("recorded");
					stopPreviewStream();
					// setFile(recordedFile);
				}
			} else {
				if (videoRef.current?.srcObject instanceof MediaStream) {
					mediaRecorderRef.current = new MediaRecorder(
						videoRef.current?.srcObject,
						{
							mimeType,
							videoBitsPerSecond: 2500000,
						},
					);
					const chunks: Blob[] = [];
					mediaRecorderRef.current.ondataavailable = (e) => {
						if (e.data.size > 0) {
							chunks.push(e.data);
						}
					};
					mediaRecorderRef.current.onstop = () => {
						onStopMediaStream(chunks);
					};
					mediaRecorderRef.current.start();
					timer.startFromZero();
					setRecording("recording");
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleStopRecording = () => {
		if (mediaRecorderRef.current && recording == "recording") {
			mediaRecorderRef.current?.stop();
			timer.stop();
		}
		stopPreviewStream();
		setRecording("recorded");
	};

	const handleContinue = () => {
		setRecording("preview");
		showPreview();
	};

	const handleRetake = () => {
		setRecording("preview");
		showPreview();
	};

	const renderFooter = () => {
		switch (recording) {
			case "preview":
				return (
					<PreviewFooter
						autoStop={autoStop}
						handleStartRecording={handleStartRecording}
					/>
				);
			case "recording":
				return (
					<RecordingFooter
						countDown={timer.value}
						autoStop={autoStop}
						onStop={handleStopRecording}
					/>
				);
			case "recorded":
				return (
					<RecordedFooter onContinue={handleContinue} onRetake={handleRetake} />
				);
			default:
				return <></>;
		}
	};

	return (
		<div className="relative flex flex-col flex-1">
			<video
				ref={videoRef}
				autoPlay
				playsInline
				muted
				className={`${
					recording == "preview" || recording == "recording"
						? "block"
						: "hidden"
				}`}
			/>
			<video
				ref={playbackRef}
				controls
				playsInline
				className={`${recording == "recorded" ? "block" : " hidden"}`}
			/>

			{renderFooter()}
		</div>
	);
};
type PreviewFooterProps = {
	handleStartRecording: () => void;
};
const PreviewFooter: React.FC<PreviewFooterProps> = ({
	handleStartRecording,
}) => {
	return (
		<div className="flex gap-2 footer px-7">
			<button
				className="p-3 bg-blue-400 border border-red-200 rounded-lg"
				onClick={handleStartRecording}
			>
				Start Recording
			</button>
		</div>
	);
};

type RecordingFooterProps = {
	countDown: number;
	autoStop: boolean;
	onStop: () => void;
};
const RecordingFooter: React.FC<RecordingFooterProps> = ({
	countDown,
	autoStop,
	onStop,
}) => {
	return (
		<div className="absolute bottom-0 left-0 right-0 py-5 mt-2 footer gradient-black-to-white px-7">
			<div className="flex justify-between">
				<span className="block font-semibold text-neutral-0">
					00:{countDown < 10 ? `0${countDown}` : countDown}
				</span>
				{!autoStop && (
					<button
						className="p-3 bg-blue-400 border border-red-200 rounded-lg"
						onClick={onStop}
					>
						Stop Recording
					</button>
				)}
			</div>
		</div>
	);
};
type RecordedFooterProps = {
	onContinue: () => void;
	onRetake: () => void;
};
const RecordedFooter: React.FC<RecordedFooterProps> = ({
	onContinue,
	onRetake,
}) => {
	return (
		<div className="flex gap-2 footer px-7">
			<button
				className="p-3 bg-blue-400 border border-red-200 rounded-lg"
				onClick={onContinue}
			>
				Continue
			</button>
			<button
				className="p-3 bg-blue-400 border border-red-200 rounded-lg"
				onClick={onRetake}
			>
				Retake Video
			</button>
		</div>
	);
};

export default HeadessVideoRecorder;
