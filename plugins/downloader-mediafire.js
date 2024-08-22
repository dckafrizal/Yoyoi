let { mediafiredl } = require('@bochilteam/scraper')

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) return conn.reply(m.chat, `[❗] *Penggunaan:* ${usedPrefix}${command} <url>`, m)
	conn.sendMessage(m.chat, {
		react: {
			text: '⏳',
			key: m.key,
		}
	})
	try {
    let res = await mediafiredl(args[0])
    let { url, url2, filename, ext, aploud, filesize, filesizeH } = res
    let caption = `
Name: ${filename}
Size: ${filesizeH}
Extension: ${ext}
Uploaded: ${aploud}
`
    await conn.sendMessage(m.chat, {
    document: { url: url }, 
    mimetype: ext, 
    fileName: `${filename}`,
    caption: caption
  }, {quoted: m})
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})
  } catch (error) {
   conn.sendMessage(m.chat, { react: { text: '🚫', key: m.key }})
    console.log(error)
    m.reply('[?] Terjadi kesalahan saat proses.')
  }
}

handler.help = ['mediafire']
handler.tags = ['downloader']
handler.command = /^(mediafire|mf)$/i

module.exports = handler