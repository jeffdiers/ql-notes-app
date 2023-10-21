"use client";

import React from "react";
import { Workspace } from "./workspace";
import Header from "../components/header";

export default function ReactApp() {
  return (
    <main>
      <Header />
      <Workspace />
    </main>
  );
}
