export const formatWeather = ([results]) => {
  const { location, current, forecast } = results;

  const degreeType = location.degreetype;
  const temperature = `${current.temperature}°${degreeType}`;
  const conditions = current.skytext;
  const low = `${forecast[1].low}°${degreeType}`;
  const high = `${forecast[1].high}°${degreeType}`;

  return `${temperature} e ${conditions} (${low} -> ${high})`;
};
