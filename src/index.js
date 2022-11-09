import TelegramBot from "node-telegram-bot-api";
import * as dotenv from "dotenv";
import { optionsWether, optionsMain, currency } from "./options/index.mjs";
import { currencyDate, city, hourlyWeather } from "./modules/index.mjs";
import { currencyDeflated } from "./api/bankApi.mjs";

dotenv.config();

const TOKEN = process.env.BOT_TOKEN;

const bot = new TelegramBot(TOKEN, { polling: true });

const start = async () => {
  bot.setMyCommands([
    {
      command: "/start",
      description: "Привіт я допоможу з вибором одягу на сьогоднішній день",
    },
  ]);

  bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    // Switch не використовую осазнано

    // main
    if (text === "Отримати курс валют") return currencyBtn(chatId);
    if (text === "Отримати прогноз погоди") return weatherInterval(chatId);

    //weather
    if (text === "За кожні 3 години") return await wether(chatId, 3, city[0]);
    if (text === "За кожні 6 години") return await wether(chatId, 6, city[1]);

    // currency
    if (text === "USD")
      return await currencyServer(chatId, currencyDeflated[0]);
    if (text === "EUR")
      return await currencyServer(chatId, currencyDeflated[1]);

    await main(chatId);
  });
};

start();

async function main(id) {
  await bot.sendMessage(id, "Що ви бажаєте отримати?", optionsMain);
}

async function currencyBtn(id) {
  await bot.sendMessage(id, "Виберіть тип валюти", currency);
}

async function currencyServer(id, currency) {
  const res = await currencyDate(currency);
  await bot.sendMessage(id, `Курс ${currency}${res}`, optionsMain);
}

async function weatherInterval(id) {
  await bot.sendMessage(
    id,
    "З яким періодом ви бажаєте отримати прогноз погоди?",
    optionsWether.interval
  );
}

async function wether(id, interval, city) {
  const res = await hourlyWeather(interval, city);
  await bot.sendMessage(id, res, optionsMain);
}

// bot.on("callback_query", async (msg) => {
//   console.log("🚀 ~ msg", msg);
//   const data = msg.data;
//   const chatId = msg.message.chat.id;

//   if (data === "/city") {
//     await bot.sendMessage(chatId, "Виберіть місто", options.city);
//   }

//   const btnInterval = dynamicRange(data);

//   if (data === "/pryluky") {
//     await bot.sendMessage(
//       chatId,
//       "З яким періодом ви бажаєте отримати прогноз погоди?",
//       btnInterval
//     );
//   }

//   if (data === "/kyiv") {
//     await bot.sendMessage(
//       chatId,
//       "З яким періодом ви бажаєте отримати прогноз погоди?",
//       btnInterval
//     );
//   }

//   const newData = data.split("/");

//   if (newData[1] === "hours3") {
//     const data = await hourlyWeather(3, newData[2]);

//     await bot.sendMessage(chatId, data, options.interval);
//   }
//   if (newData[1] === "hours6") {
//     const data = await hourlyWeather(6, newData[2]);

//     await bot.sendMessage(chatId, data, options.interval);
//   }
// });
