import React, { useRef } from "react";
import { DataLoaderOrchestrator } from "@locoworks/reusejs-toolkit-utils";

const DataLoaderOrchestratorExample = () => {
	const orchestratorRef = useRef(null);

	const handler = async () => {
		return new Promise(function (resolve, reject) {
			setTimeout(() => {
				const x = Number.parseInt(`${Math.random() * 20}`) % 2;
				if (x === 0) {
					resolve({
						state: "success",
					});
				} else {
					reject({
						state: "error",
					});
				}
			}, 1000);
		});
	};

	const Loading = (props, ref) => {
		console.log(">>>>>Loding Props", props, ref);
		return (
			<div className="w-1/2 h-10 flex items-center justify-center bg-blue-400">
				<label>Loading</label>
			</div>
		);
	};

	const Success = (props, ref) => {
		console.log(">>>>>Success Props", props, ref);
		return (
			<div className="w-1/2 h-10 flex items-center justify-center bg-green-400">
				<label>Success</label>
			</div>
		);
	};

	const Error = (props, ref) => {
		console.log(">>>>>Error Props", props, ref);
		return (
			<div className="w-1/2 h-10 flex items-center justify-center bg-red-400">
				<label>Error</label>
			</div>
		);
	};

	return (
		<div className="flex gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
			<DataLoaderOrchestrator
				handler={handler}
				ref={orchestratorRef}
				components={{
					loading: React.forwardRef((props, ref) => {
						return <Loading props={props} ref={ref} />;
					}),
					success: React.forwardRef((props, ref) => {
						return <Success props={props} ref={ref} />;
					}),
					error: React.forwardRef((props, ref) => {
						return <Error props={props} ref={ref} />;
					}),
				}}
			/>
		</div>
	);
};

export default DataLoaderOrchestratorExample;
