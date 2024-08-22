const axios = require('axios');
const cheerio = require('cheerio');

const handler = async function (m, { conn, args, usedPrefix, command }) {
  if (!args[0]) {
    return m.reply(`[❗] *Penggunaan:* ${usedPrefix + command} <url>`);
  }
  if (!/^http(s):\/\/videy\.co/i.test(args[0])) {
    return m.reply('[❗] Pastikan link yang diberikan berasal dari videy.');
  }

  try {
    let result = await videy(args[0]);
    if (result) {
      await conn.sendFile(m.chat, result, null, '*• Downloader - Videy*', m);
    } else {
      await conn.reply(m.chat, '[❗] Kesalahan: Tidak dapat mengambil sumber video', m);
    }
  } catch (error) {
    console.log(error);
    await conn.reply(m.chat, 'Error: ' + error.message, m);
  }
};

async function videy(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const videoSrc = $('source[type="video/mp4"]').attr('src');
    if (videoSrc) {
      return videoSrc;
    } else {
      throw new Error('[❗] Sumber video tidak ditemukan');
    }
  } catch (error) {
    console.error(`Error fetching the URL: ${error.message}`);
    throw error;
  }
}

handler.help = ['videy'];
handler.tags = ['downloader'];
handler.command = ['videy', 'videydl'];
handler.limit = true;

module.exports = handler;
