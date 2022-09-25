import axios from "axios";

export const baseUrl = "https://bayut.p.rapidapi.com";

export const fetchApi = async (url) => {
  try {
    const { data } = await axios.get(url, {
      headers: {
        "X-RapidAPI-Host": "bayut.p.rapidapi.com",
        "X-RapidAPI-Key": "5960ce78d9mshb4803669a0d260dp13ba57jsn3dd0395d5f8c",
      },
    });

    console.log(data?.hits);
    return data;
  } catch (error) {
    console.log(error);
  }
};
