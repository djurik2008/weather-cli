import chalk from "chalk";
import dedent from "dedent";

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
