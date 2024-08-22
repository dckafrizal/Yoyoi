let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text)
    throw `*• Example :* ${usedPrefix + command} *[number]*\nGet List image Type *.listimg*`;
  let array = JSON.parse(require("fs").readFileSync("./database/image.json"));
  m.reply(`*• Result Form :* ${array[text - 1].name}`, array[text - 1].url);
};
handler.help = ["getimg"].map((a) => a + " *[number]*");
handler.tags = ["tools"];
handler.command = ["getimg"];
module.exports = handler;
