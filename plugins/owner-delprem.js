let handler = async function (m, { text, args, usedPrefix, command }) {
  if (!text) throw `*• Exmaple :* ${usedPrefix + command} *[number]*`;
  if (isNaN(text)) throw `*• Exmaple :* ${usedPrefix + command} *[number]*`;
  try {
    let user =
      db.data.users[
        text.replace(/\s/g, "").replace(/([@+-])/g, "") + "@s.whatsapp.net"
      ];
    if (!user.registered) throw "*[USER NOT REGISTER]*";
    if (!user.premium) throw "*[USER NOT PREMIUM]*";
    if (user.banned) throw "*[USER HAS BANNED]*";
    user.premium = false;
    user.premiumDate = 0;
    m.reply(`Successfully removed premium access to that user`);
  } catch (e) {
    throw eror;
  }
};
handler.help = ["delprem", "unprem"].map((a) => a + " *[number]*");
handler.command = ["delprem", "unprem"];
handler.tags = ["owner"];
handler.rowner = true;

module.exports = handler;
