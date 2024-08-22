let handler = async (m, { usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || "";
  if (!mime) throw `*• Example:* ${usedPrefix + command} *[reply/send media]*`;
  try {
    let media = await q.download();
    let link = `*[ AKIRAA UPLOADER ]*
> • _*Link:* ${await Uploader.catbox(media)}_`;
    m.reply(link.trim());
  } catch (e) {
    throw eror;
  }
};
handler.help = ["tourl", "upload"].map((a) => a + " *[reply/send media]*");
handler.tags = ["tools"];
handler.command = ["tourl", "upload"];
module.exports = handler;
