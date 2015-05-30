var request = require('request');

export function makeRequest(url) {
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (!!error || response.statusCode !== 200)
        return reject(error);
      resolve(response.body);
    });
  });
}
