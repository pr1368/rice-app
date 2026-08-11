import api from "./api";

export const createOrder = async (orderData) => {
  const response = await api.post("/orders", orderData);

  return response.data;
};

export const payOrder = async (orderId) => {
  const response = await api.post(`/orders/${orderId}/pay`);

  return response.data;
};