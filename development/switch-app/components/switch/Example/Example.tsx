import React from "react";
import Switch from "@locoworks/reusejs-react-switch";

const Example = () => {
	const [enabled, setEnabled] = React.useState<boolean>(false);

	return (
		<div className="flex flex-col items-center gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
			<Switch
				checked={enabled}
				onChange={setEnabled}
				className={`${enabled ? "bg-blue-500" : "bg-gray-200"}
				  relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
			>
				<span className="sr-only">Use setting</span>
				<span
					aria-hidden="true"
					className={`${enabled ? "translate-x-9" : "translate-x-0"}
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
				/>
			</Switch>
		</div>
	);
};

export default Example;
