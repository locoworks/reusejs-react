import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
import React from "react";

export default function Document() {
	return (
		<Html lang="en">
			<link
				rel="stylesheet"
				href="https://cdn.jsdelivr.net/npm/@docsearch/css@3"
			/>
			<Head />
			<body>
				<Main />
				<NextScript />
				<Script src="https://cdn.jsdelivr.net/npm/@docsearch/react@3"></Script>
			</body>
		</Html>
	);
}
