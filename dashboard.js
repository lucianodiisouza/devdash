import React from "react";

import blessed from "blessed";
import { render } from "react-blessed";

import { Today } from "./components";

const App = () => {
  return <Today updateInterval={5000} />;
};

const screen = blessed.screen({
  autoPadding: true,
  smartCSR: true,
  title: "Blessed Dashboard",
});

screen.key(["escape", "q", "C-c"], () => process.exit(0));

render(<App />, screen);
