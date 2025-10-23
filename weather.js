#!/usr/bin/env node
import { getArgs } from "./helpers/args.js";
import { printHelp, printError, printSucess } from "./services/log.service.js";
import { saveKeyValue } from "./services/storage.service.js";

const saveToken = async (token) => {
  if (!token.length) {
    printError("Токен не передано");
  }
  try {
    await saveKeyValue("token", token);
    printSucess(`Токен ${token} збережено`);
  } catch (e) {
    printError(e.message);
  }
};

const initCLI = () => {
  const args = getArgs(process.argv);
  if (args.h) {
    printHelp();
  }
  if (args.s) {
  }
  if (args.t) {
    saveToken(args.t);
  }
};

initCLI();
