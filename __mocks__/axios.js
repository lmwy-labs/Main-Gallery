const get = (url) => {
  const restaurantName = url.split('/')[3];
  if (restaurantName === 'willThrowError') {
    return Promise.reject('Unknown error');
  }

  if (restaurantName === 'noImagesHere') {
    return Promise.resolve({
      data: [],
    });
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
