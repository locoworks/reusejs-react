import React from "react";
import { Slider } from "@locoworks/reusejs-react-slider-carousel";

const List = [
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

const Slide = ({ heading, phrase }) => {
  return (
    <div className="flex flex-col bg-red-300 cursor-pointer justify-center items-center h-full w-full overflow-hidden slide-right-to-left">
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

const slidesArray = List.map((element, index) => {
  return (
    <Slide
      heading={element.heading}
      phrase={element.phrase}
      key={"Slide" + index}
    />
  );
});

const SliderWithProgress = () => {
  return (
    <div className="flex flex-col items-center gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50 px-6">
      <Slider
        slideInterval={2000}
        statusArray={slidesArray}
        loop={true}
        enableButton={true}
        progressStyle="flex h-full rounded-full bg-green-500"
        progressContainerStyles="flex h-4 mx-1 z-10  grow rounded-full overflow-hidden bg-gray-500"
        SliderContainerStyles="flex relative bg-white cursor-pointer overflow-hidden no-touch-highlight w-full h-full"
        sliderWrapperClasses={
          "relative flex items-center justify-center h-96 w-full bg-gray-200"
        }
        progressPosition="absolute w-full top-10 flex justify-between items-center px-4"
      />
    </div>
  );
};

export default SliderWithProgress;
