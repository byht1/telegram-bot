import * as fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

import {
  currencyDeflated,
  serverMonoBank,
  serverPrivatBank,
} from "../api/bankApi.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const bancDB = path.join(__dirname, "../db/bancDB.json");

const serverBankDate = async () => {
  const privat = await serverPrivatBank();
  const mono = await serverMonoBank();

  const date = Date.now();

  const db = { data: { privat, mono }, version: date };

  await fs.writeFile(bancDB, JSON.stringify(db));

  return db;
};

const bankDBCurrent = async () => {
  const db = await fs.readFile(bancDB);
  const data = JSON.parse(db);
  console.log("🚀 ~ data", data);

  const date = Date.now();

  const isCurrent = date - data.version <= 60 * 1000;
  console.log("🚀 ~ isCurrent", isCurrent);

  return {
    data,
    isCurrent,
  };
};

const exchangeRate = async () => {
  const isValid = await bankDBCurrent();

  if (isValid.isCurrent) return isValid.data;

  console.log("next");

  return await serverBankDate();
};

export const currencyDate = async (currency) => {
  const { data } = await exchangeRate();
  const message = [];

  for (const key in data) {
    data[key].forEach(({ bank, currency: currentCurrency, buy, sale }) => {
      if (currency !== currentCurrency) return;

      message.push(`\n\n${bank}\n  Купити = ${buy}\n  Продати = ${sale}`);

      return;
    });
  }

  return message.join(",");
};

// console.log("🚀 ~ currencyDate();", await currencyDate(currencyDeflated[0]));
