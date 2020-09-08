export const successRequest = ({ onSuccess, file }) => {
  console.log('do request...');
  setTimeout(() => {
    console.log('request success...');
    onSuccess(null, file);
  });
};

export const errorRequest = ({ onError }) => {
  setTimeout(() => {
    onError();
  });
};
