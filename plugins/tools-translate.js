const { translate } = require("@vitalets/google-translate-api");

let handler = async (m, { conn, text, usedPrefix, command }) => {
  let isCode = await (await listLanguage()).map(a => a.code);
  if (!text) throw `*• Example :* ${usedPrefix + command} *id Good Night*

*[ LIST LANGUAGE ]*
${await (await listLanguage()).map((a, i) => `> *${i + 1}* ${a.name.toUpperCase()} *[ ${a.code} ]*`).join("\n")}`;
  let keyword = text.split(" ")[0];
  let data = text.slice(keyword.length + 1);
  if (isCode.includes(keyword)) 
    m.reply(wait);
  try {
    if (!isCode.includes(keyword)) throw `*[ LIST LANGUAGE ]*
${await (await listLanguage()).map((a, i) => `> *${i + 1}* ${a.name.toUpperCase()} *[ ${a.code} ]*`).join("\n")}`;
    let txt = await (
      await translate(data, { to: keyword, autoCorrect: true }).catch((_) => null)
    ).text.toString();
    m.reply(txt);
  } catch (e) {
    throw e;
  }
};
handler.help = ["translate", "tr"].map((a) => a + " *[input text]*");
handler.tags = ["tools"];
handler.command = ["translate", "tr"];

module.exports = handler;

async function listLanguage() {
  let data = await (await Func.fetchJson("https://translate.google.com/translate_a/l?client=webapp&sl=auto&tl=en&v=1.0&hl=en&pv=1&tk=&source=bh&ssel=0&tsel=0&kc=1&tk=626515.626515&q=")).sl;
  const result = Object.entries(data).map(([code, name]) => ({
    code,
    name
  }));
  return result;
}