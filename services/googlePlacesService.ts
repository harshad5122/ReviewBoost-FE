import API from "./api";

export const searchPlaces = async (query: string) => {
  const response = await API.get(`/google-places/search?query=${query}`);

  return response.data;
};

export const getPlaceDetails = async (placeId: string) => {
  const response = await API.get(`/google-places/details/${placeId}`);

  return response.data;
};
