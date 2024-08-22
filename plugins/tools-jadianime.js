let fetch = require("node-fetch");
let uploadImage = require("../lib/uploadImage.js");

let handler = async (m, { conn, usedPrefix, command, text }) => {
  let who =
    m.mentionedJid && m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.fromMe
        ? conn.user.jid
        : m.sender;
  let name = await conn.getName(who);
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || "";
  if (!mime) throw `*• Example :* ${usedPrefix + command} *[reply/send media]*`;
  m.reply(wait);
  let media = await q.download();
  let url = await uploadImage(media);
  let hasil = await (
    await fetch(`https://skizo.tech/api/toanime?url=${url}&apikey=Twelve`)
  ).buffer();
  await conn.sendFile(m.chat, hasil, "", done, m);
};
handler.help = ["toanime", "jadianime"].map((a) => a + " *[reply/send media]*");
handler.tags = ["tools"];
handler.command = ["toanime", "jadianime"];
handler.limit = true;

module.exports = handler;
