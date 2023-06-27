import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/input");
  }, []);
  return <></>;
}
