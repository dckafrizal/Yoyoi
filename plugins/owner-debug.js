let handler = async (m, { conn, text, usedPrefix, command }) => {
     if (!text)  throw `*• Example :* ${usedPrefix + command} *[on/off]*`
    if (text === "on") {
 db.data.settings.debug = true
   m.reply("Success Turn On : *[ Debug Mode ]*")
} else if (text === "off") {
 db.data.settings.debug = false
   m.reply("Success Turn Off : *[ Debug Mode ]*")
} else throw `*• Example :* ${usedPrefix + command} *[on/off]*`
}
handler.before = async (m,{ isOwner }) => {
   let settings = db.data.settings
   if (settings.debug && isOwner) {
    m.reply(await Func.jsonFormat(m)) 
  }
}
handler.help = ["debug"].map(a => a + " *[debug mode]*")
handler.tags = ["owner"]
handler.command = ["debug"]
handler.owner = true

module.exports = handler