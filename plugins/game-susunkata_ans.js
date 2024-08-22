const similarity = require("similarity");
const threshold = 0.72;
let handler = (m) => m;
handler.before = async function (m) {
  let id = m.chat;
  if (
    !m.quoted ||
    !m.quoted.fromMe ||
    !m.quoted.isBaileys ||
    !/Ketik.*suska/i.test(m.quoted.text)
  )
    return !0;
  this.susunkata = this.susunkata ? this.susunkata : {};
  if (!(id in this.susunkata)) return m.reply("Soal itu telah berakhir");
  if (m.quoted.id == this.susunkata[id][0].id) {
    let json = JSON.parse(JSON.stringify(this.susunkata[id][1]));
    // m.reply(JSON.stringify(json, null, '\t'))
    if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
      global.db.data.users[m.sender].point += this.susunkata[id][2];
      this.sendImageAsSticker(m.chat, betul, m, { packname: `+${this.susunkata[id][2]} Point`})
      clearTimeout(this.susunkata[id][3]);
      delete this.susunkata[id];
    } else this.sendImageAsSticker(m.chat, salah, m, { packname: `© Takemii.js`})
  }
  return !0;
};
handler.exp = 0;

module.exports = handler;