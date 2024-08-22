let fetch = require('node-fetch')

let handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, '[❗] *Penggunaan:* .snack <url>', m)
  conn.sendMessage(m.chat, { react: { text: "⏳", key: m.key } });
  let kemii = await fetch(`https://api.lolhuman.xyz/api/snackvideo?apikey=${global.lolkey}&url=${text}`)
  let res = await kemii.json()
  conn.sendFile(m.chat, res.result.url, 'snack.mp4', done, m)
 await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})
}
handler.help = ['snack']
handler.tags = ['downloader']

handler.command = /^snack$/i
handler.premium = false

module.exports = handler
