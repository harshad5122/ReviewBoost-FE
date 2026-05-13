import API from "./api";

export const getBusinesses = async () => {
  const response = await API.get("/business");

  return response.data;
};

export const createBusiness = async (data: any) => {
  const response = await API.post("/business", data);

  return response.data;
};
