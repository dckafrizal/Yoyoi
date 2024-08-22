let handler = async (m, { conn, text, usedPrefix, command }) => {
    let [atas, bawah] = text.split`|`
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw `*• Example :* ${usedPrefix + command} *[upper|lower]*`
    let img = await q.download()
    let url = await Uploader.catbox(img)
    let meme = `https://api.memegen.link/images/custom/${encodeURIComponent(atas ? atas : '')}/${encodeURIComponent(bawah ? bawah : '')}.png?background=${url}`
    conn.sendImageAsSticker(m.chat, meme, m, { packname: packname, author: author })

}
handler.help = ['stickermeme','smeme'].map(a => a + " *[upper|lower]*")
handler.tags = ['sticker']
handler.command = ['stickermeme','smeme']
handler.limit = true

module.exports = handler