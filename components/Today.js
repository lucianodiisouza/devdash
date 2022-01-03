import React, { useState, useEffect, useCallback } from "react";
import figlet from "figlet";
import useInterval from "@use-it/interval";
import weather from "weather-js";
import util from "util";

const findWeather = util.promisify(weather.find);

const formatWeather = ([results]) => {
  const { location, current, forecast } = results;

  const degreeType = location.degreetype;
  const temperature = `${current.temperature}°${degreeType}`;
  const conditions = current.skytext;
  const low = `${forecast[1].low}°${degreeType}`;
  const high = `${forecast[1].high}°${degreeType}`;

  return `${temperature} e ${conditions} (${low} -> ${high})`;
};

import { FONTS } from "../utils/fonts";

function Today({
  updateInterval = 900000,
  search = "Belo Horizonte, MG",
  degreeType = "C",
}) {
  const [fontIndex, seetFontIndex] = useState(0);
  const [now, setNow] = useState(new Date());
  const [weather, setWeather] = useState({
    status: "loading",
    error: null,
    data: null,
  });

  const fetchWeather = useCallback(async () => {
    setWeather({
      status: "loading",
      error: null,
      data: null,
    });

    let data;

    try {
      data = await findWeather({
        search,
        degreeType,
      });
      setWeather({ status: "complete", error: null, data });
    } catch (err) {
      setWeather({ status: "error", error: err, data: null });
    }
  }, [search, degreeType]);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  useInterval(() => {
    fetchWeather();
  }, updateInterval);

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
