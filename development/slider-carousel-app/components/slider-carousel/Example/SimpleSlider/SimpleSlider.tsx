import React from "react";
// Import New Component created here
import { ReuseSliderCarousel } from "@locoworks/reusejs-react-slider-carousel";

interface ListInterface {
  heading: string;
  phrase: string;
}

const List: ListInterface[] = [
  {
    heading: "Get Real-time Forex Rates with zero delay time",
    phrase: "Monitor, manage, quote, compare, and conquer market surprises",
  },
  {
    heading: "Plan your daily FX operations seamlessly",
    phrase:
      "Quantify risk on your exposures and plan ahead with real-time forex rates 24X5",
  },
  {
    heading: "Plan your daily forex operations seamlessly",
    phrase: "Let the system help you with hedge pickups vs cash rates",
  },
  {
    heading: "Pay-as-you-go model for personalised support",
    phrase:
      "Compute the viability of deals and prepare quotes to win new business",
  },
  {
    heading: "Expand cross border business and never miss a deal",
    phrase: "Pay only when you need us on a per consult basis",
  },
];

const Slide = ({ heading, phrase }: ListInterface) => {
  return (
    <>
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
    </>
  );
};

const slidesArray: React.ReactNode[] = [];
List.forEach((element: any, index: number) => [
  slidesArray.push(
    <Slide heading={element.heading} phrase={element.phrase} key={index} />
  ),
]);

const SliderWithButton = () => {
  return (
    <div className="flex flex-col items-center gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
      <ReuseSliderCarousel
        slideInterval={2000}
        slides={slidesArray}
        loop={true}
        sliderContainerClasses="slide-right-to-left slide-to-left" // custom class created for animation use any class you want and apply animationas poer your need
      />
    </div>
  );
};

export default SliderWithButton;
