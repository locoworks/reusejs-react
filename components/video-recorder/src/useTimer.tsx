import { useState, useEffect } from "react";

const useTimer = () => {
	const [started, setStarted] = useState<boolean>(false);
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

	const start = (value: number) => {
		setStarted(true);
		setSeconds(value);
		setHasStopped(false);
	};

	const stop = () => {
		setStarted(false);
		setHasStopped(true);
	};

	return { start, stop, value: seconds, hasStopped };
};

export default useTimer;
