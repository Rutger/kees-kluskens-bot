const fs = require('fs');
const moment = require('moment');

// Keep track of when we responded about food for the last time so we only do it once a day maximum
let lastSaidFood = null;

module.exports = function (bot) {
  bot.onText(/\b(grap)\b/i, (msg) => {
    const resp = 'je LEVEN is een grap!';
    bot.sendMessage(msg.chat.id, resp);
  });
  bot.onText(/^inb4/i, (msg) => {
    const resp = 'inb4 opkankeren';
    bot.sendMessage(msg.chat.id, resp);
  });
  bot.onText(/communis/i, (msg) => {
    const resp = '☭☭☭ RELIGIE IS DE OPIUM VAN HET VOLK ☭☭☭';
    bot.sendMessage(msg.chat.id, resp);
  });
  bot.onText(/apple/i, (msg) => {
    if (Math.random() < 0.15) {
      const resp = 'rip steve';
      bot.sendMessage(msg.chat.id, resp);
    }
  });
  bot.onText(/systemctl/i, (msg) => {
    const resp = 'als het goed is wel man';
    bot.sendMessage(msg.chat.id, resp);
  });
  bot.onText(/angelsaksisch/i, (msg) => {
    const resp = 'doe es niet zo angelsaksisch';
    bot.sendMessage(msg.chat.id, resp);
  });
  bot.onText(/^hmmm/i, (msg) => {
    if (Math.random() < 0.5) {
      const resp = 'wiet';
      bot.sendMessage(msg.chat.id, resp);
    }
  });
  bot.onText(/^kk /i, (msg) => {
    if (Math.random() < 0.2) {
      const resp = 'Zei je nou kikker?';
      bot.sendMessage(msg.chat.id, resp);
    }
  });
  bot.onText(/doei/i, (msg) => {
    const audio = fs.readFileSync('sounds/doeihe.wav');
    bot.sendVoice(msg.chat.id, audio);
  });
  bot.onText(/dudu/i, (msg) => {
    const audio = fs.readFileSync('sounds/sandstorm.wav');
    bot.sendVoice(msg.chat.id, audio);
  });
  bot.onText(/^(eten|food|lunch)/i, (msg) => {
    const today = moment();
    if (lastSaidFood && lastSaidFood.isSame(today, 'day')) {
      return;
    }
    if (today.hour() < 12) {
      const resp = 'nog te vroeg man';
      bot.sendMessage(msg.chat.id, resp);
    } else if (today.weekday() === 2) {
      // indo on wednesdays
      const resp = 'indo?';
      bot.sendMessage(msg.chat.id, resp);
    }
    lastSaidFood = today;
  });
};
