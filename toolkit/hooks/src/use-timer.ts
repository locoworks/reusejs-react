import { useState, useEffect } from "react";

interface useTimerHook {
	start: (value: number) => void;
	stop: () => void;
	startFromZero: () => void;
	value: number;
	hasStopped: boolean;
}

const useTimer = (): useTimerHook => {
	const [started, setStarted] = useState<boolean>(false);
	const [countUp, setCountUp] = useState<boolean>(false);
	const [seconds, setSeconds] = useState<number>(0);
	const [hasStopped, setHasStopped] = useState<boolean>(false);

	useEffect(() => {
		if (started) {
			const interval = setInterval(() => {
				if (seconds > 0) {
					setSeconds(seconds - 1);
				} else {
					clearInterval(interval);
					setHasStopped(true);
				}
			}, 1000);

			return () => clearInterval(interval);
		}
		return;
	}, [started, seconds]);

	useEffect(() => {
		if (countUp) {
			const interval = setInterval(() => {
				setSeconds((prevSeconds) => prevSeconds + 1);
			}, 1000);

			return () => clearInterval(interval);
		}
	}, [countUp, seconds]);

	const start = (value: number) => {
		setStarted(true);
		setSeconds(value);
		setHasStopped(false);
	};

	const stop = () => {
		setStarted(false);
		setCountUp(false);
		setHasStopped(true);
	};

	const startFromZero = () => {
		setCountUp(true);
		setSeconds(0);
		setHasStopped(true);
	};
	return {
		start,
		stop,
		value: seconds,
		startFromZero,
		hasStopped,
	};
};

export default useTimer;
