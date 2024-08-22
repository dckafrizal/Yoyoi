let handler = async (m, { conn, text, usedPrefix, command }) => {
  const num = m.quoted?.sender || m.mentionedJid?.[0] || m.sender;
  const user = db.data.users[num];
  try {
    let pp = await conn
      .profilePictureUrl(num, "image")
      .catch((e) => "https://files.catbox.moe/ifx2y7.png");
    let name = user.name;
    let umur = user.age;
    let register = user.registered ? "_Sudah daftar _" : "_Belum Daftar_";
    let premium = user.premium ? "✅" : "❎";
    let online =
      user.online * 10 === Date.now()
        ? `_( Offline )${await HariIni(user.online)}_`
        : `_( Online ) Hari ini_`;
    let premiumDate = isNaN(user.premiumDate)
      ? user.premiumDate
      : `${(await Func.toDate(user.premiumDate)) || "Tidak ada waktu durasi"}`;

    let caption = `*[ PROFILE USER ]*
*• name:* ${name}
*• umur:* _${umur || "Tidak di ketahui"}_
*• Url WhatsApp:* wa.me/${num.split("@")[0]}
*• Tag Users* @${num.split("@")[0]}
*• Status user:* ${online}
*• Jumlah chat:* ${user.chat} *[ hari ini ]*
*• Status Premium:* ${premium}
*• Durasi Premium:* ${premiumDate || ""}`;
    m.reply(caption, pp);
  } catch (e) {
    throw eror;
  }
};
handler.help = ["profile"];
handler.tags = ["info"];
handler.command = ["profile"];
handler.register = true

module.exports = handler;

function HariIni(ms) {
  const sekarang = ms;
  const date = new Date(sekarang).toLocaleString("id-ID", {
    timeZone: "Asia/Jakarta",
  });
  const hari = new Date(sekarang).toLocaleString("id-ID", {
    timeZone: "Asia/Jakarta",
    hours: "long",
  });
  const jam = new Date(sekarang).getHours();
  const menit = new Date(sekarang).getMinutes();

  return `Terakhir terlihat: ${hari}`;
}