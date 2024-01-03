export const generatePublicUrl = (fileName) => {
  // console.log(fileName);
  // if(fileName)
  return `${process.env.REACT_APP_API_HOST}/public/${fileName}`;
};
