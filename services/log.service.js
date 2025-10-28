import chalk from "chalk";
import dedent from "dedent";
import boxen from "boxen";
import countries from "i18n-iso-countries";

export const printError = (err) => {
  console.log(chalk.bgRed(" ERROR ") + " " + err);
};

export const printSucess = (msg) => {
  console.log(chalk.bgGreen(" SUCESS ") + " " + msg);
};

export const printHelp = () => {
  console.log(dedent`${chalk.bgCyan(" HELP ")}
    Без параметрів - вивід погоди
    -s [CITY] - для встановлення міста
    -h для виводу допомоги
    -t [API_KEY] для збереження токена
    `);
};

const WEATHER_ICONS = {
  "01": "☀️",
  "02": "🌤️",
  "03": "☁️",
  "04": "🌥️",
  "09": "🌧️",
  10: "🌦️",
  11: "⛈️",
  13: "❄️",
  50: "🌫️",
};

const INFO_ICONS = {
  temp: "🌡️",
  feels: "🤔",
  humidity: "💧",
  wind: "🌬️",
  gust: "💨",
  pin: "📍",
};

export const printWeather = (data) => {
  const description = capitalizeFirstLetter(data.weather[0].description);
  const iconKey = data.weather[0].icon.slice(0, 2);
  const iconSymbol = WEATHER_ICONS[iconKey] || "❔";
  const { temp, feels_like, humidity } = data.main;
  const { speed, gust } = data.wind;
  const city = data.name;
  const country = countries.getName(data.sys.country, "uk");

  const weatherInfo = `
${chalk.yellow.bold(`${iconSymbol}  ${capitalizeFirstLetter(description)}`)}
${chalk.gray("──────────────────────────────────────────────")}
${INFO_ICONS.pin} ${chalk.white.bold(`${city}, ${country}`)}
${INFO_ICONS.temp}  Температура: ${chalk.white(`${temp}°C`)}
${INFO_ICONS.feels} Відчувається як: ${chalk.white(`${feels_like}°C`)}
${INFO_ICONS.humidity} Вологість: ${chalk.white(`${humidity}%`)}
${INFO_ICONS.wind}  Вітер: ${chalk.white(`${speed} м/с`)}
${INFO_ICONS.gust} Пориви до: ${chalk.white(`${gust} м/с`)}
`;

  console.log(
    boxen(weatherInfo.trim(), {
      padding: 1,
      borderColor: "cyan",
      borderStyle: "round",
      align: "left",
      backgroundColor: "#65057e",
    })
  );
};

const capitalizeFirstLetter = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1);
