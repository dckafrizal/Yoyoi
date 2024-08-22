let { MessageType } = require('@whiskeysockets/baileys')
let PhoneNumber = require('awesome-phonenumber')
let handler = async (m, { conn, usedPrefix, text, args, command }) => {
      let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:WhatsApp; Ritz\nORG:Ritz\nTITLE:soft\nitem1.TEL;waid=${nomorown}:${nomorown}\nitem1.X-ABLabel:Ponsel\nitem2.URL:https://whatsapp.com/channel/0029VaX3jOgAe5VguykGye3k\nitem2.X-ABLabel:ðŸ’¬ More\nitem3.EMAIL;type=INTERNET:ritz404@gmail.com\nitem3.X-ABLabel:Email\nitem4.ADR:;;Indonesia;;;;\nitem4.X-ABADR:ðŸ’¬ More\nitem4.X-ABLabel:Lokasi\nEND:VCARD`;
      const sentMsg = await conn.sendMessage(
    m.chat,
    {
      contacts: {
        displayName: wm,
        contacts: [{ vcard }],
      },
      contextInfo: {
        externalAdReply: {
          title: "CHRISTY - MD",
          body: "Version: Beta",
          thumbnailUrl: 'https://telegra.ph/file/15e30d3169ee34e86f290.jpg',
          mediaType: 1,
          showAdAttribution: false,
          renderLargerThumbnail: true,
        },
      },
    },
    { quoted: m },
  );
}
handler.help = ['owner']
handler.tags = ['info']

handler.command = /^(owner)$/i

module.exports = handler