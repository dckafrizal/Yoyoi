let handler = async (m, { conn, text, usedPrefix, command }) => {
  m.reply(
    `Link Group : *[ https://chat.whatsapp.com/${await conn.groupInviteCode(m.chat)} ]*`,
  );
};
handler.help = ["linkgc"].map((a) => a + " *[get link group]*");
handler.tags = ["group"];
handler.command = ["linkgc"];
handler.group = true;
handler.botAdmin = true;
module.exports = handler;
