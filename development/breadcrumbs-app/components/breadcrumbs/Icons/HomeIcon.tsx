import React from "react";

function HomeIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			width="32"
			height="32"
		>
			<defs>
				<linearGradient id="a">
					<stop offset="0" stopColor="#24f7bc"></stop>
					<stop offset="1" stopColor="#24c4fc"></stop>
				</linearGradient>
				<linearGradient
					id="b"
					x1="949.87"
					x2="974.39"
					y1="518.014"
					y2="544.657"
					gradientTransform="translate(-969.568 491.682) scale(1.02524)"
					gradientUnits="userSpaceOnUse"
					xlinkHref="#a"
				></linearGradient>
			</defs>
			<g transform="translate(0 -1020.362)">
				<rect
					width="32"
					height="32"
					y="1020.362"
					fill="url(#b)"
					rx="6.763"
					ry="6.763"
				></rect>
				<path
					style={{
						textIndent: "0",
						textAlign: "start",
						lineHeight: "normal",
						textTransform: "none",
					}}
					fill="#fff"
					fillRule="evenodd"
					d="M15.987 1028.362a.501.501 0 00-.352.149l-7.492 7.545a.501.501 0 10.711.707l1.139-1.147v8.246a.5.5 0 00.5.5h11a.5.5 0 00.5-.5v-8.244l1.137 1.145a.501.501 0 00.355.146.501.501 0 00.033-1.002h.176l-1.701-1.713v-2.761a.5.5 0 00-.508-.508.5.5 0 00-.492.508v1.755l-4.647-4.677a.501.501 0 00-.359-.149zm.004 1.213l5.002 5.037v8.75h-3v-4.5a.5.5 0 00-.5-.5h-3a.5.5 0 00-.5.5v4.5h-3v-8.754l4.998-5.033zm.002 2.787c-1.099 0-2 .902-2 2 0 1.099.901 2 2 2s2-.901 2-2c0-1.098-.901-2-2-2zm0 1c.558 0 1 .442 1 1s-.442 1-1 1-1-.442-1-1 .442-1 1-1zm-1 6h2v4h-2v-4z"
					color="#000"
					fontFamily="sans-serif"
					fontWeight="400"
					overflow="visible"
				></path>
			</g>
		</svg>
	);
}

export default HomeIcon;
