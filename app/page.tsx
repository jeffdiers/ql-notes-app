import React from "react";
import dynamic from "next/dynamic";

const ReactApp = dynamic(() => import("./containers/reactApp"), {
  ssr: false,
});

export default function Home() {
  return <ReactApp />;
}
