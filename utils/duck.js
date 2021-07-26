const got = require('got');

module.exports = function duckSearch(value) {
  const query = value.replace(/[^a-zA-Z0-9 ]/g, '');
  const url = `https://duckduckgo.com/?q=!ducky+${encodeURIComponent(
    query
  )}&kl=nl-nl`;

  return got(url).then((response) => {
    const responseUrl = response.body
      .match(/=http(.*?)(?=')/)[0]
      .substring(1)
      // DuckDuckGo adds a random &rut query param that breaks shit
      .replace(/&rut=\w+/, '');
    const responseUrlDecoded = decodeURIComponent(responseUrl);

    return responseUrlDecoded;
  });
};
