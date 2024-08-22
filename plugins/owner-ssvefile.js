let handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw `*• Example :* ${usedPrefix + command} *[path]*`;
  if (!m.quoted.text) throw `*[ ! ] Reply Message*`;
  let path = `${text}`;
  await require("fs").writeFileSync(path, m.quoted.text);

  m.reply(`*[ SUCCESS SAVE FILE ]*`);
};

handler.help = ["savefile"].map((v) => v + " *[path]*");
handler.tags = ["owner"];
handler.command = ["savefile"];

handler.owner = true;
module.exports = handler;
