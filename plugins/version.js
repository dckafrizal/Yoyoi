
const fs = require('fs');
let packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
let version = packageJson.version;

let handler = async (m, { conn }) => {
  conn.reply(m.chat, `Christy MD: VERSION *${global.version}*`, m, {
    contextInfo: {
      externalAdReply: {
        title: `${global.namebot}`,
        body: "",
        thumbnailUrl: "https://telegra.ph/file/f20440d800c473fb5fe4c.jpg",
        sourceUrl: "https://whatsapp.com/channel/0029VaX3jOgAe5VguykGye3k",
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  });
};

handler.command = ['version'];
handler.help = ['version'];
handler.tags = ['info'];

module.exports = handler;
