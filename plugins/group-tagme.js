let handler = async (m, { conn, text, usedPrefix, command }) => {
  m.reply("@" + m.sender.split("@")[0])
}
handler.help = ["tagme"].map(a => a + " *[tag yourself]*")
handler.tags = ["group"]
handler.command = ["tagme"]
handler.group = true

module.exports = handler