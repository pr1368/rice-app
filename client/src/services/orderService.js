import api from "./api";


// ایجاد سفارش
export const createOrder = async (orderData) => {
  const response = await api.post(
    "/orders",
    orderData
  );

  return response.data;
};


// دریافت سفارش‌های من
export const getMyOrders = async () => {
  const response = await api.get("/orders");

  return response.data;
};


// دریافت جزئیات سفارش
export const getOrderById = async (orderId) => {
  const response = await api.get(
    `/orders/${orderId}`
  );

  return response.data;
};


// پرداخت سفارش
export const payOrder = async (orderId) => {
  const response = await api.post(
    `/orders/${orderId}/pay`
  );

  return response.data;
};


// لغو سفارش
export const cancelOrder = async (orderId) => {
  const response = await api.patch(
    `/orders/${orderId}/cancel`
  );

  return response.data;
};