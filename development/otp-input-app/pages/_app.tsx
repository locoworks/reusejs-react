import "@/styles/globals.css";
import React from "react";
import Head from "next/head";
import { MDXProvider } from "@mdx-js/react";
import { CodeProcessor } from "@locoworks/reusejs-react-code-preview";

type StringKeyStringObject = { [key: string]: string };

function convertArrayToObject(array: string[]) {
	const obj: StringKeyStringObject = {};
	array.forEach((item) => {
		const [key, value] = item.split(":");
		const trimmedKey = key.trim();
		const trimmedValue = value.trim().replace(/(^"|"$)/g, "");
		obj[trimmedKey] = trimmedValue;
	});
	return obj;
}

export default function App({ Component, pageProps }: any) {
	const components: any = {
		h2: (props: any) => {
			if (props.id.includes("head-object")) {
				const val = convertArrayToObject(
					props?.children[1]?.replace("HEAD OBJECT\n", "").split("\n"),
				);
				return (
					<Head>
						<title>{val.title}</title>
						{Object.keys(val)?.map((ele) => {
							if (ele !== "title")
								return <meta key={ele} name={ele} content={val[ele]} />;
						})}
					</Head>
				);
			}
			return <h2 {...props} />;
		},
		pre: (props: any) => {
			if (props.children?.props?.children?.includes("[TO-SPLIT]")) {
				return CodeProcessor(props?.children?.props?.children);
			} else {
				return (
					<pre>
						<code>{props.children}</code>
					</pre>
				);
			}
		},
	};

	return (
		<MDXProvider components={components}>
			<Component {...pageProps} />
		</MDXProvider>
	);
}
