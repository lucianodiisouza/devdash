import React, { useState } from "react";
import figlet from "figlet";
import useInterval from "@use-it/interval";
import weather from "weather-js";
import util from "util";

const findWeather = util.promisify(weather.find);

import { FONTS, formatWeather } from "../utils";
import { useRequest } from "../hooks/useRequest";

function Today({
  updateInterval = 900000,
  search = "Belo Horizonte, MG",
  degreeType = "C",
}) {
  const [fontIndex, seetFontIndex] = useState(0);
  const [now, setNow] = useState(new Date());
  const weather = useRequest(
    findWeather,
    {
      search,
      degreeType,
    },
    updateInterval
  );

  useInterval(() => {
    setNow(new Date());
  }, 60000); // 1min

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
      
${time}

${
  weather.status === "loading"
    ? "Carregando..."
    : weather.error
    ? `Erro: ${weather.error}`
    : formatWeather(weather.data)
}°C
`}
    </box>
  );
}

export default Today;
