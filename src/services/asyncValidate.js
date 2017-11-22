const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export const checkExistedEmail = (email, name) => {
  return sleep(1000).then(() => {
    let result = {};
    result[name] = 'That email is taken'
    throw result;
  });
};
export const emptyPromise = () => {
  return new Promise((resolve) => resolve());
}