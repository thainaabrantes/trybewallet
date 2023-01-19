const WALLET_BASE_API = 'https://economia.awesomeapi.com.br/json/all';

const fetchApi = async () => {
  const response = await fetch(WALLET_BASE_API);
  return response.json();
};

export default fetchApi;
