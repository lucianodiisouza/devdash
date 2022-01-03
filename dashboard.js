import React, { useState, useRef, useEffect } from "react";
import blessed from "blessed";

import { render } from "react-blessed";
import figlet from "figlet";

const FONTS = [
  "Straight",
  "ANSI Shadow",
  "Shimrod",
  "doom",
  "Big",
  "Ogre",
  "Small",
  "Standard",
  "Bigfig",
  "Mini",
  "Small Script",
  "Small Shadow",
];

const App = () => {
  const [fontIndex, seetFontIndex] = useState(0);
  const timer = useRef();

  useEffect(() => {
    timer.current = setTimeout(() => seetFontIndex(fontIndex + 1), 1000);
    return () => clearTimeout(timer.current);
  }, [fontIndex]);

  const now = new Date();

  const date = now.toLocaleString("pt-BR", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const time = figlet.textSync(
    now.toLocaleString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
    {
      font: FONTS[fontIndex % FONTS.length],
    }
  );

  return (
    <box
      top="center"
      left="center"
      width="50%"
      height="50%"
      border={{ type: "line" }}
      style={{
        border: { fg: "blue" },
      }}
    >
      {`${date}
      
${time}`}
    </box>
  );
};

const screen = blessed.screen({
  autoPadding: true,
  smartCSR: true,
  title: "Blessed Dashboard",
});

screen.key(["escape", "q", "C-c"], () => process.exit(0));

render(<App />, screen);
