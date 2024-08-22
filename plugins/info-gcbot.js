let handler = async (m, { conn, text, usedPrefix, command }) => {
   conn.sendButton(m.chat,[["BACK TO MENU","menu"],["INFO OWNER",".owner"]], m, {
body: `Join to official group to get more Information : *[ ${sgc} ]*`
})
}
handler.help = ["gcbot"].map(a => a + " *[official group bot]*")
handler.tags = ["info"]
handler.command = ["gcbot"]

module.exports = handler