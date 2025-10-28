#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import {
  printHelp,
  printError,
  printSucess,
  printWeather,
} from "./services/log.service.js";
import { saveKeyValue, getKeyValue } from "./services/storage.service.js";
import { TOKEN_DICTIONARY } from "./services/storage.service.js";
import { getWeather } from "./services/api.service.js";

const saveToken = async (token) => {
  if (!token.length) {
    printError("Введіть токен за допомогою -t [API_KEY]");
    return;
  }

  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSucess(`Токен ${token} збережено`);
  } catch (e) {
    printError(e.message);
  }
};

const isExistCity = async (city) => {
  try {
    await getWeather(city);
    return true;
  } catch (e) {
    if (e?.response?.status === 404) {
      printError("Помилка! Місто не знайдено обо вказано неправильно.");
      return false;
    } else {
      printError(e.message);
      return false;
    }
  }
};

const saveCity = async (city) => {
  if (!city.length) {
    printError("Введіть місто за допомогою -s [CITY]");
    return;
  }

  if (await isExistCity(city)) {
    try {
      await saveKeyValue(TOKEN_DICTIONARY.city, city);
      printSucess(`Місто ${city} збережено.`);
    } catch (e) {
      printError(e.message);
    }
  }
};

const getForcast = async () => {
  const city = await getKeyValue(TOKEN_DICTIONARY.city);

  if (!city) {
    printError("Упсс. Для початку збережіть місто за допомогою -s [CITY]");
  }
  try {
    const weather = await getWeather(city);
    printWeather(weather);
  } catch (e) {
    if (e?.response?.status === 404) {
      printError("Помилка! Місто не знайдено обо вказано неправильно.");
    } else if (e?.response?.status === 401) {
      printError("Токен вказано неправильно.");
    } else {
      printError(e.message);
    }
  }
};

const initCLI = async () => {
  const args = getArgs(process.argv);

  if (args.h) {
    printHelp();
  }

  if (args.s) {
    await saveCity(args.s);
    return;
  }

  if (args.t) {
    await saveToken(args.t);
    return;
  }

  await getForcast();
};

initCLI();
