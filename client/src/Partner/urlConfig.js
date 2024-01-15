export const generatePublicUrl = (fileName) => {
  // return `192.168.29.211:5000/public/${fileName}`;

  return `${process.env.REACT_APP_API_HOST}/public/${fileName}`;
};
