import React from "react";
import dynamic from "next/dynamic";

import "./reset.css";

const ReactApp = dynamic(() => import("./containers/reactApp"), {
  ssr: false,
});

export default function Home() {
  return <ReactApp />;
}
