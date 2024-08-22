const fetch = require("node-fetch");

let handler = async (m, { conn, text, usedPrefix, command }) => {
	let url = `https://api.fumifumi.xyz/api/text2img?query=${text}`
	conn.sendFile(m.chat, url, null, `hasil txt2img dari ${text}`, m)
}
handler.help = ['txt2img']
handler.tags = ['ai']
handler.command = /^(txt2img)$/i
handler.premium = false
handler.limit = true;
handler.register = true;

module.exports = handler;