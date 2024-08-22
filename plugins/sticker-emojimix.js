const { sticker5 } = require("../lib/sticker.js");

let handler = async (m, { conn, text, args }) => {
  if (!args[0]) throw "*• Example :* .emojimix 😠+😂";
  let [emoji1, emoji2] = text.split`+`;
  let anu = await Func.fetchJson(
    `https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`,
  );
  for (let res of anu.results) {
    let stiker = await sticker5(false, res.url, global.packname, global.author);
    conn.sendFile(m.chat, stiker, "sticker.webp", "", m);
  }
};

handler.help = ["emojimix"].map((a) => a + " *[emoji1+emoji2]*");
handler.tags = ["sticker"];
handler.command = ["emojimix"];
handler.limit = true;
module.exports = handler;
