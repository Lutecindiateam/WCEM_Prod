// const baseUrl = "https://flipkart-rest-server.herokuapp.com";
export const api = 'http://192.168.29.211:2000/api';

// export const api = `${baseUrl}/api`;
export const generatePublicUrl = (fileName) => {
  return `http://192.168.29.211:2000/public/${fileName}`;
};
