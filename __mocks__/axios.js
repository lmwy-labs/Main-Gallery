const get = (url) => {
  if (url.split('/')[3].substring(1) > 100) {
    return Promise.reject('No images found for this restaurant');
  }

  return Promise.resolve({
    data: [
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
    ],
  });
};

exports.get = get;
