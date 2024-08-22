
‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎‎
const axios = require('axios')
let handler = async (m, { conn, usedPrefix, command, text, isOwner }) => {
  if (!text) throw `Use ${usedPrefix + command} look at me`
  conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
try {
  let resp = await openai(text) 
  conn.reply(m.chat, resp, m) 
} catch (e) {
  console.log(e) 
  m.reply("failed responsible") 
 }
}



handler.help = ["ai", "openai"]
handler.tags = ["ai"]
handler.command = /^(ai|gpt)$/i
handler.register = true
module.exports = handler

// SCRAPERS [ API ] BY YANZBOTZ

async function openai(q) {
    return new Promise(async (resolve, reject) => {
   try {
       let res = await axios.post("https://api.yanzbotz.my.id/api/ai/gpt4", { query: q,
         prompt: "kamu adalah william butcher" }, 
       { 
         headers: { "Content-Type": "application/json" }});
       let regex = /"answer":"([^"]*)"/g;
       let match;
       let result = '';
       while ((match = regex.exec(res.data)) !== null) {
          result += match[1];
       }
          resolve(result.replace(/\\n/g, '\n').replace(/\\/g, '').replace(/\*\*/g, '*').replace(/###/g, '>'));
   } catch (e) {
     console.log(e);
    }
 });
}