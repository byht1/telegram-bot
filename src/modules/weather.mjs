import { getWrapper } from "../api/weatherApi.mjs";

const hours3 = ["00", "03", "06", "09", "12", "15", "18", "21"];
const hours6 = ["00", "06", "12", "18"];
const week = [
  "Неділя",
  "Понеділок",
  "Вівторок",
  "Середе",
  "Четверг",
  "П'ятниця",
  "Субота",
];
const month = [
  "Січень",
  "Лютий",
  "Березень",
  "Квітень",
  "Травень",
  "Червень",
  "Липень",
  "Серпень",
  "Вересень",
  "Жовтень",
  "Листопад",
  "Грудень",
];

export const city = ["pryluky", "kyiv"];

const cityData = {
  pryluky: {
    name: "Прилуки",
    lat: "50.588471",
    lon: "32.387583",
  },
  kyiv: {
    name: "Київ",
    lat: "50.450100",
    lon: "30.523400",
  },
};

export const hourlyWeather = async (typeInterval, city) => {
  const { name, lat, lon } = cityData[city];
  const interval = typeInterval == 3 ? hours3 : hours6;
  const res = await getWrapper(lat, lon);

  const data = await res.reduce((acc, { main, dt_txt, weather }) => {
    const dateForecast = dt_txt.split(" ");
    const hours = dateForecast[1].split(":");

    if (!interval.includes(hours[0])) return acc;

    const date = new Date(dt_txt);
    const newDay = week[date.getDay()];
    const newMonth = month[date.getMonth()];
    const numberDay = dateForecast[0].split("-").pop();

    const temp = Math.round(main.temp);
    const tempFeeling = Math.round(main.feels_like);
    const tempStr = `${temp >= 0 ? `+${temp}` : temp} °C`;
    const tempFeelingStr = `${
      tempFeeling >= 0 ? `+${tempFeeling}` : tempFeeling
    } °C`;

    const accInfo = acc.findIndex((x) => x.day === newDay);

    const infoTimeDay = `\n  ${hours[0]}:${hours[1]}, ${tempStr}, відчувається: ${tempFeelingStr}, ${weather[0].description}`;

    if (accInfo !== -1) {
      acc[accInfo].info.push(infoTimeDay);
      return acc;
    }

    acc.push({
      day: newDay,
      infoDay: `${newDay}, ${numberDay} ${newMonth}:`,
      info: [infoTimeDay],
    });

    return acc;
  }, []);

  return `Погода в місті ${name}\n${data
    .map(({ infoDay, info }) => `\n${infoDay} ${info}`)
    .join("\n")}`;
};
