import React, { useState, useRef, useEffect } from "react";
import figlet from "figlet";
import useInterval from "@use-it/interval";

import { FONTS } from "../utils/fonts";

function Today({ updateInterval = 1000 }) {
  const [fontIndex, seetFontIndex] = useState(0);
  const timer = useRef();

  useInterval(() => {
    seetFontIndex(fontIndex + 1);
  }, updateInterval);

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
}

// const screen = blessed.screen({
//   autoPadding: true,
//   smartCSR: true,
//   title: "Blessed Dashboard",
// });

export default Today;
