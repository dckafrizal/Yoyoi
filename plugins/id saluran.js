let handler = async (m, { text }) => {
if (!text) return m.reply("Mana linknya?")
try {
  var { data } = await require("axios").get("https://manaxu-seven.vercel.app/api/others/chwa?query=" + text)
  var { name, follower, description } = data.result
  var x = `*Name:* ${name}\n*Followers:* ${follower}\n*Description:* ${description}`
  m.reply(x)
} catch (e) {
return m.reply("fitur eror")
}
}
handler.command = handler.help = ["chwa"]
handler.tags = ["tools"]

module.exports = handler