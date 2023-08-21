import React from "react";
import { useRouter } from "next/router";

export default function index() {
	const router = useRouter();

	router.push("/reusejs-react");
	return <div>Utilities</div>;
}

{
	/* ---
HEAD OBJECT
title: "ReuseJS Toolkit"
author: "John Doe"
---

## Table of contents

# Reusejs Utils Toolkit


export default ({ children }) => {
  return <div className="prose max-w-full mx-4 pb-10" >{children}</div>
}; */
}
