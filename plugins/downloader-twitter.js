let fetch = require('node-fetch')

let handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, '[❗] *Penggunaan:* .twitter <url>', m)
  conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key }})
  let kemii = await fetch(`https://api.alyachan.dev/api/twitter?url=${text}&apikey=dcodekemii`)
  try {
  let res = await kemii.json()
  let start = new Date();
await conn.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
  conn.sendFile(m.chat, res.data[0].url, 'twiter.mp4', '```Berhasil!```', m)
   } catch (e) {
    console.log(e);
    await conn.sendMessage(m.chat, { react: { text: "🚫", key: m.key } });
    await m.reply(`[❗] Masukan link!!`);
  }
}
handler.help = ['twitter']
handler.tags = ['downloader']

handler.command = /^twitter$/i
handler.limit = true
handler.group = false

module.exports = handler
