import api from './api';

export const logWaste = async (wasteData: any) => {
  const response = await api.post('/waste/log', wasteData);
  return response.data;
};

export const getHistory = async () => {
  const response = await api.get('/waste/history');
  return response.data;
};
