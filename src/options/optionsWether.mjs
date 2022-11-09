export const optionsWether = {
  city: {
    reply_markup: JSON.stringify({
      keyboard: [[{ text: "Прилуки" }]],
    }),
  },
  interval: {
    reply_markup: JSON.stringify({
      keyboard: [
        [{ text: "За кожні 3 години" }, { text: "За кожні 6 години" }],
        [{ text: "Головне меню" }],
      ],
    }),
  },
};
