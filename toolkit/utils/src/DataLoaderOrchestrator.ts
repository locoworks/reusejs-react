import React, { useState, useEffect, useImperativeHandle } from "react";

interface OrchestratorProps {
	handler: (args?: any) => Promise<any>;
	components: { [key: string]: React.ComponentType<any> };
}

const Orchestrator: React.ForwardRefRenderFunction<any, OrchestratorProps> = (
	{ handler, components },
	ref,
) => {
	const [state, setState] = useState("loading");
	const [response, setResponse] = useState<any>(null);

	const load = async (args = {}) => {
		try {
			setState("loading");
			const response = await handler(args);
			setResponse(response);
			setState(response.state);
		} catch (error) {
			setResponse(error);
			setState((error as any).state);
			return error;
		}
	};

	useEffect(() => {
		load();
	}, []);

	const StateComponent = components[state];

	useImperativeHandle(ref, () => {
		return {
			reload: (args = {}) => {
				load(args);
			},
		};
	});

	const reload = (args: any) => {
		load(args);
	};

	return React.createElement(
		StateComponent,
		{ response: { response }, reload: { reload } },
		null,
	);
};

export default React.forwardRef(Orchestrator);
