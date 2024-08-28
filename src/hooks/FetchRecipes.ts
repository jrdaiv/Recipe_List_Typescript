import axios from "axios";

export const fetchRecipes = async (query: string) => {
  const apiKey = "6e88935135dbab95666a4958f6123bd6";
  const appId = "b514173a";

  try {
    const response = await axios.get(
      `https://trackapi.nutritionix.com/v2/search/instant`,
      {
        params: {
          query: query,
        },
        headers: {
          "Content-Type": "application/json",
          "x-app-id": appId,
          "x-app-key": apiKey,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("API request failed:");
    throw error;
  }
};
