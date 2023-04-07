const randomString = (length) => {
  return [...Array(length)].map(() => Math.floor(Math.random() * 10)).join('');
};

export default randomString;
