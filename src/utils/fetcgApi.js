import axios from "axios";

export const baseUrl = "https://bayut.p.rapidapi.com";

export const fetchApi = async (url) => {
  try {
    const { data } = await axios.get(url, {
      headers: {
        "X-RapidAPI-Host": "bayut.p.rapidapi.com",
        "X-RapidAPI-Key": "2fcc0cb87cmsh6a51fbbea851d94p1ecefejsn8fd55180f288",
      },
    });

    console.log(data?.hits);
    return data;
  } catch (error) {
    console.log(error);
  }
};
