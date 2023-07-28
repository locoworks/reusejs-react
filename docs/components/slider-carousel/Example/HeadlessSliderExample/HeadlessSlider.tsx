import React from "react";
import { useSlider } from "@locoworks/reusejs-toolkit-react-hooks";
import { HeadlessSliderCarousel } from "@locoworks/reusejs-react-slider-carousel";

interface ListInterface {
	heading: string;
	phrase: string;
}

const List: ListInterface[] = [
	{
		heading: "Slider 1",
		phrase: "Monitor, manage, quote, compare, and conquer market surprises",
	},
	{
		heading: "Slider 2",
		phrase:
			"Quantify risk on your exposures and plan ahead with real-time forex rates 24X5",
	},
	{
		heading: "Slider 3",
		phrase: "Let the system help you with hedge pickups vs cash rates",
	},
	{
		heading: "Slider 4",
		phrase:
			"Compute the viability of deals and prepare quotes to win new business",
	},
	{
		heading: "Slider 5",
		phrase: "Pay only when you need us on a per consult basis",
	},
];

const Slide = ({ heading, phrase }: ListInterface) => {
	return (
		<div className="flex flex-col bg-red-300 cursor-pointer justify-center items-center h-full w-screen overflow-hidden slide-right-to-left mx-6">
			<div className="flex justify-center items-center flex-col h-96 w-full">
				<div className="flex flex-col justify-center items-center text-center">
					<h1 className={`text-4xl font-bold mt-3 ease-linear origin-left`}>
						{heading}
					</h1>
					<p
						className={`mt-2 text-lg font-normal text-fray-400 ease-linear origin-left`}
					>
						{phrase}
					</p>
				</div>
			</div>
		</div>
	);
};

const slidesArray: React.ReactNode[] = List.map(
	(element: ListInterface, index: number) => [
		<div className="w-full h-full flex bg-green-300 shrink-0" key={index}>
			<Slide
				heading={element.heading}
				phrase={element.phrase}
				key={"Slide" + index}
			/>
		</div>,
	],
);

const HeadlessSlider = () => {
	const { currentSlideIndex } = useSlider({
		slideInterval: 2000,
		slides: slidesArray,
		loop: true,
	});
	return (
		<div>
			<HeadlessSliderCarousel
				slides={slidesArray}
				dependency={currentSlideIndex}
				className="flex h-full w-full items-center align-center  overflow-hidden text-center"
			/>
		</div>
	);
};

export default HeadlessSlider;
