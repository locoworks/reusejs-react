import React, {
	useRef,
	useState,
	CSSProperties,
	useCallback,
	useEffect,
	useImperativeHandle,
} from "react";
import { twMerge } from "tailwind-merge";
import { useTimer } from "@locoworks/reusejs-toolkit-react-hooks";
import { PreviewFooter } from "./PreviewFooter";
import { RecordingFooter } from "./RecordingFooter";
import { RecordedFooter } from "./RecordedFooter";
export interface HeadlessVideoRecorderRef {
	recording: string;
	handleDownload: () => void;
	showPreview: () => void;
}
interface HeadlessVideoRecorderProps {
	autoStop?: boolean;
	autoPreview?: boolean;
	timeInMs?: number;
	videoBitsPerSecond?: number;
	handleStateChange?: (state: VideoState) => void;
	customhandleDownload?: (file: File | null) => void;
	customCountDown?: (count: number) => React.ReactNode;
	customRetakeButton?: (onRetake: () => void) => React.ReactNode;
	customStopRecording?: (onStop: () => void) => React.ReactNode;
	customStartRecording?: (onStart: () => void) => React.ReactNode;
	customDownloadButton?: (onDownload: () => void) => React.ReactNode;
	mediaConstraints?: MediaStreamConstraints;
	recorderContainerClasses?: string | CSSProperties;
	videoRecorderClasses?: string | CSSProperties;
	playbackVideoClasses?: string | CSSProperties;
	footerContainerClasses?: string | CSSProperties;
	startRecordingbuttonClasses?: string | CSSProperties;
	recordingFooterClasses?: string | CSSProperties;
	previewFooterClasses?: string | CSSProperties;
	recordedFooterClasses?: string | CSSProperties;
	retakeButtonClasses?: string | CSSProperties;
	downloadButtonClasses?: string | CSSProperties;
	loader?: React.ReactNode;
	retakeLabel?: string;
	downloadLabel?: string;
	stopLabel?: string;
	startLabel?: string;
}

export type VideoState = "inactive" | "preview" | "recording" | "recorded";

type VideoMimeTypes = "video/mp4" | "video/webm";

const HeadlessVideoRecorder: React.ForwardRefRenderFunction<
	HeadlessVideoRecorderRef,
	HeadlessVideoRecorderProps
> = (
	{
		autoStop = true,
		autoPreview = true,
		timeInMs = 15000,
		videoBitsPerSecond = 2500000,
		mediaConstraints,
		loader,
		handleStateChange,
		customhandleDownload,
		customRetakeButton,
		customCountDown,
		customStopRecording,
		customStartRecording,
		customDownloadButton,
		recorderContainerClasses,
		videoRecorderClasses,
		playbackVideoClasses,
		footerContainerClasses,
		recordingFooterClasses,
		previewFooterClasses,
		recordedFooterClasses,
		startRecordingbuttonClasses,
		retakeButtonClasses,
		downloadButtonClasses,
		retakeLabel,
		downloadLabel,
		stopLabel,
		startLabel,
	},
	ref,
) => {
	const [recording, setRecording] = useState<VideoState>("inactive");
	const [file, setFile] = useState<File | null>(null);
	const [loading, setLoading] = useState(false);

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
	const fileExtension = supportedMimeType?.split("/")[1];

	const showStreamPreview = useCallback(async () => {
		let mergeVideoConstraints: MediaStreamConstraints["video"] = {
			width: { ideal: 640, max: 640 },
			height: { ideal: 480, max: 480 },
			facingMode: "user",
			frameRate: { ideal: 15, max: 30 },
		};

		if (
			typeof mediaConstraints?.video === "object" &&
			mediaConstraints.video !== null
		) {
			mergeVideoConstraints = {
				...mergeVideoConstraints,
				...mediaConstraints.video,
			};
		}
		const mergeAudioConstraints = mediaConstraints?.audio ?? true;

		const stream = await navigator.mediaDevices.getUserMedia({
			video: mergeVideoConstraints,
			audio: mergeAudioConstraints,
		});

		if (videoRef.current) {
			videoRef.current.srcObject = stream;
			videoRef.current.onloadedmetadata = () => {
				setLoading(false);
			};
		}
	}, [videoRef]);

	const showPreview = useCallback(async () => {
		try {
			setLoading(true);

			showStreamPreview();
			setRecording("preview");
		} catch (error) {
			console.log("Preview Error__", error);
		}
	}, [showStreamPreview]);

	useEffect(() => {
		autoPreview && showPreview();
	}, [showPreview]);

	useEffect(() => {
		handleStateChange && handleStateChange(recording);
	}, [recording]);

	const handleFileDownload = useCallback(() => {
		if (file) {
			const url = URL.createObjectURL(file);
			const a = document.createElement("a");
			a.href = url;
			a.download = file.name || "recorded-video";
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);
		} else {
			console.log("File not Found!");
		}
	}, [file]);

	const handleDownload = useCallback(() => {
		(customhandleDownload || handleFileDownload)(file);
	}, [file]);

	useImperativeHandle(
		ref,
		() => {
			return {
				recording,
				handleDownload,
				showPreview,
			};
		},
		[recording, handleDownload, showPreview],
	);

	const wait = (delayInMS: number) => {
		return new Promise((resolve) => setTimeout(resolve, delayInMS));
	};

	const record = async (
		stream: MediaStream,
		lengthInMs: number,
		videoBitsPerSecond: number = 2500000,
	) => {
		const recorder = new MediaRecorder(stream, {
			mimeType,
			videoBitsPerSecond,
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

	const stopPreviewStream: () => void = () => {
		if (videoRef.current?.srcObject instanceof MediaStream) {
			const stream = videoRef.current?.srcObject;
			stream?.getTracks().forEach((track) => track.stop());
		}
	};

	const onStopMediaStream = (recordedChunks: Blob[] | undefined) => {
		const recorderBlob = new Blob(recordedChunks, { type: blobType });
		const videoSrc = URL.createObjectURL(recorderBlob);

		const extension = fileExtension;
		const recordedFile = new File([recorderBlob], `video.${extension}`, {
			type: extension,
		});
		setFile(recordedFile);
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
						videoBitsPerSecond,
					);
					onStopMediaStream(recordedChunks);
					setRecording("recorded");
					stopPreviewStream();
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

	const handleStopRecording: () => void = () => {
		if (mediaRecorderRef.current && recording == "recording") {
			mediaRecorderRef.current?.stop();
			timer.stop();
		}
		stopPreviewStream();
		setRecording("recorded");
	};

	const handleRetake: () => void = () => {
		setRecording("preview");
		showPreview();
	};

	const renderFooter: () => React.JSX.Element = () => {
		switch (recording) {
			case "preview":
				return (
					<PreviewFooter
						handleStartRecording={handleStartRecording}
						customStartRecording={customStartRecording}
						footerContainerClasses={footerContainerClasses}
						startRecordingbuttonClasses={startRecordingbuttonClasses}
						previewFooterClasses={previewFooterClasses}
						startLabel={startLabel}
					/>
				);
			case "recording":
				return (
					<RecordingFooter
						countDown={timer.value}
						autoStop={autoStop}
						onStop={handleStopRecording}
						customCountDown={customCountDown}
						customStopRecording={customStopRecording}
						footerContainerClasses={footerContainerClasses}
						recordingFooterClasses={recordingFooterClasses}
						stopLabel={stopLabel}
					/>
				);
			case "recorded":
				return (
					<RecordedFooter
						onRetake={handleRetake}
						onDownload={handleDownload}
						customRetakeButton={customRetakeButton}
						customDownloadButton={customDownloadButton}
						recordedFooterClasses={recordedFooterClasses}
						footerContainerClasses={footerContainerClasses}
						retakeButtonClasses={retakeButtonClasses}
						downloadButtonClasses={downloadButtonClasses}
						retakeLabel={retakeLabel}
						downloadLabel={downloadLabel}
					/>
				);
			default:
				return <></>;
		}
	};

	const defaultRecorderContainerClasses = "relative flex flex-col flex-1";
	const defaultVideoRecorderClasses = `${
		recording !== "recorded" ? "block" : "hidden"
	}`;
	const defaultPlaybackVideoClasses = `${
		recording === "recorded" ? "block" : "hidden"
	}`;

	return (
		<div
			className={
				typeof recorderContainerClasses === "string"
					? twMerge(defaultRecorderContainerClasses, recorderContainerClasses)
					: defaultRecorderContainerClasses
			}
			style={
				typeof recorderContainerClasses === "object"
					? recorderContainerClasses
					: {}
			}
		>
			{loading && (loader ? loader : "Loading Preview....")}

			<video
				ref={videoRef}
				autoPlay
				playsInline
				muted
				className={
					typeof videoRecorderClasses === "string"
						? twMerge(defaultVideoRecorderClasses, videoRecorderClasses)
						: defaultVideoRecorderClasses
				}
				style={
					typeof videoRecorderClasses === "object" ? videoRecorderClasses : {}
				}
			/>
			<video
				ref={playbackRef}
				controls
				playsInline
				className={
					typeof playbackVideoClasses === "string"
						? twMerge(defaultPlaybackVideoClasses, playbackVideoClasses)
						: defaultPlaybackVideoClasses
				}
				style={
					typeof playbackVideoClasses === "object" ? playbackVideoClasses : {}
				}
			/>
			{renderFooter()}
		</div>
	);
};

export default React.forwardRef(HeadlessVideoRecorder);
