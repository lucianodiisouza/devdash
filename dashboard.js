import React from "react";
import blessed from "blessed";

import { render } from "react-blessed";

const App = () => {
  return <box>Hello Blessed</box>;
};

const screen = blessed.screen({
  autoPadding: true,
  smartCSR: true,
  title: "Blessed Dashboard",
});

screen.key(["escape", "q", "C-c"], () => process.exit(0));

const conmponente = render(<App />, screen);
