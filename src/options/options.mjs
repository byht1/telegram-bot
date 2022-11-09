export const optionsMain = {
  reply_markup: JSON.stringify({
    keyboard: [
      [{ text: "Отримати курс валют" }],
      [{ text: "Отримати прогноз погоди" }],
    ],
  }),
};

// export const dynamicRange = (city) => {
//   return {
//     reply_markup: JSON.stringify({
//       keyboard: [
//         [
//           { text: "За кожні 3 години", callback_data: `/hours3${city}` },
//           { text: "За кожні 6 години", callback_data: `/hours6${city}` },
//         ],
//       ],
//     }),
//   };
// };

// weather;
// { text: "Отримати прогноз погоди", callback_data: "/weather" }
