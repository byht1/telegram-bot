import axios from "axios";

export const currencyDeflated = ["USD", "EUR"];
const currencyId = [840, 978];
const bank = {
  privat: "ПриватБанк",
  mono: "MonoBank",
};

export const serverPrivatBank = async () => {
  const serverDataURL1 =
    "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5";
  const server = await axios.get(serverDataURL1);
  const data = await server.data
    .filter((currency) => currencyDeflated.includes(currency.ccy))
    .map(({ ccy, base_ccy, buy, sale }) => ({
      bank: bank.privat,
      currency: ccy,
      currencyBase: base_ccy,
      buy: Number(buy).toFixed(2),
      sale: Number(sale).toFixed(2),
    }));

  return data;
};

export const serverMonoBank = async () => {
  const serverDataURL1 = "https://api.monobank.ua/bank/currency";
  const server = await axios.get(serverDataURL1);
  const data = await server.data
    .filter(
      (currency) =>
        currencyId.includes(currency.currencyCodeA) &&
        currency.currencyCodeB === 980
    )
    .map(({ currencyCodeA, rateBuy, rateSell }) => ({
      bank: bank.mono,
      currency:
        currencyCodeA === 840 ? currencyDeflated[0] : currencyDeflated[1],
      currencyBase: "UAH",
      buy: Number(rateBuy).toFixed(2),
      sale: Number(rateSell).toFixed(2),
    }));

  return data;
};
