let handler = async (m, { conn, usedPrefix, command, text }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || "";
  if (!mime) throw `*• Example :* ${usedPrefix + command} *[reply/send media]*`;
  m.reply(wait);
  let media = await q.download();
  let url = await Uploader.catbox(media);
  let hasil = await Upscale(url)
  await conn.sendFile(m.chat, hasil, "", done, m);
}
handler.help = ["hd", "hdr", "upscale", "remini"].map((a) => a + " *[reply/send media]*");
handler.tags = ["tools"];
handler.command = ["hd", "hdr", "upscale", "remini"]
handler.limit = true;

module.exports = handler;

async function Upscale(so) {
    try {
        const response = await axios.get(`https://www.api.vyturex.com/upscale?imageUrl=${so}`);
        return response.data.resultUrl;
    } catch (error) {
        throw new Error('Error fetching or filtering JSON:', error);
    }
}