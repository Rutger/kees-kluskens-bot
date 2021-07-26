const got = require('got');
const duckSearch = require('../utils/duck');

module.exports = function (bot) {
  bot.onText(/\?\?$/, (msg) => {
    const query = msg.text.replace(/\?/g, '');

    if (!query) {
      return;
    }

    duckSearch(query).then((url) => {
      bot.sendMessage(msg.chat.id, url);
    });
  });

  bot.onText(/\?\?💩$/, (msg) => {
    const query = msg.text.replace(/\?/g, '').slice(0, -2);

    if (!query) {
      return;
    }

    const url = `https://www.bing.com/search?q=${encodeURIComponent(query)}`;

    got(url).then((response) => {
      const responseUrl = response.body
        .split('b_algo')[1]
        .match(/<a href="([^<]+)" /)[0]
        .substring('<a href="'.length)
        .slice(0, -2);
      const responseUrlDecoded = decodeURIComponent(responseUrl);

      bot.sendMessage(msg.chat.id, responseUrlDecoded);
    });
  });
};
