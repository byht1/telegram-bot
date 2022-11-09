import axios from "axios";

const weatherServices = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/forecast",
});

export const getWrapper = async (lat, lon) => {
  try {
    const res = await weatherServices.get(
      `?lat=${lat}&lon=${lon}&appid=240db9aaf78ae7082f1efbe922927c1c&units=metric&lang=uk`
    );

    return res.data.list;
  } catch (error) {
    throw error;
  }
};
