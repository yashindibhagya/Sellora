import React from "react";
import RootNavigator from "./src/navigation";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <>
      <RootNavigator />
      <StatusBar style="auto" />
    </>
  );
}

