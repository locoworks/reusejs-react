import React from "react";

function ListIcon() {
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
					fill="#fff"
					d="M10 1032.362v2h2v-2h-2zm3 0v2h9v-2h-9zm-3 3v2h2v-2h-2zm3 0v2h9v-2h-9zm-3 3v2h2v-2h-2zm3 0v2h9v-2h-9z"
					color="#000"
					overflow="visible"
				></path>
			</g>
		</svg>
	);
}

export default ListIcon;
