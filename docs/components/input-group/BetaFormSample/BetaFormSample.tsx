import React, { useEffect, useState } from "react";
import { ReuseInputGroup } from "@locoworks/reusejs-react-input-group";
import { ReuseButton } from "@locoworks/reusejs-react-button";
import { useBetaForm } from "@locoworks/reusejs-toolkit-react-hooks";

const BetaFormSample = () => {
	const form = useBetaForm({
		name: "",
		email: "",
	});
	const [passed, setPassed] = useState(false);

	const constraints = {
		name: {
			presence: { allowEmpty: false },
		},
		email: {
			presence: { allowEmpty: false },
			email: true,
		},
	};

	useEffect(() => {
		form.setValidationRules(constraints);
	}, [constraints]);

	const handleClick = () => {
		form.validate();
		setPassed(true);
	};

	return (
		<div className="flex gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
			<div className="flex flex-col w-1/2 gap-y-2 items-center">
				<ReuseInputGroup
					className={
						passed && !form.errors.has("name")
							? "border-green-500 focus:border-green-700 "
							: ""
					}
					value={form.getField("name")}
					placeholder="Full Name"
					onChange={(e) => {
						form.setField("name", e.target.value);
					}}
					errorText={form.errors.get("name")}
				/>

				<ReuseInputGroup
					className={
						passed && !form.errors.has("email")
							? "border-green-500 focus:border-green-700 "
							: ""
					}
					value={form.getField("email")}
					placeholder="Email"
					onChange={(e) => {
						form.setField("email", e.target.value);
					}}
					errorText={form.errors.get("email")}
				/>
				<ReuseButton
					className="bg-blue-400 hover:bg-blue-500 rounded w-28"
					onClick={handleClick}
				>
					Submit
				</ReuseButton>
			</div>
		</div>
	);
};

export default BetaFormSample;
