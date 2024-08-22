

var handler = async (m, { conn }) => {
    conn.sendMessage(m.chat, { react: { text: '🌊', key: m.key }})
    let x = `https://itzpire.com/random/sticker-anime`
    conn.sendImageAsSticker(m.chat, x, m, { packname: `ᴋᴏʙᴏ` author: m.name})
}

handler.command = ["stikeranime", "stickeranime"]
handler.help = ["stickeranime"]
handler.tags = ["random"]
handler.limit = true
handler.register = true

module.exports = handler