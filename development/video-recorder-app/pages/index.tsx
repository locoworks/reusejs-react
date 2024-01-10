import React, { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
	const router = useRouter();

	useEffect(() => {
		router.push("/video-recorder");
	}, []);

	return (
		<main
			className={`flex min-h-screen flex-col items-center justify-between p-24`}
		></main>
	);
}
