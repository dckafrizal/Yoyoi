let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*• Example :* ${usedPrefix + command} *[query]*`;
  m.reply(wait);
  try {
    let search = await Func.fetchJson(
      `https://api.obfs.dev/api/pixiv/search?word=${text} ai illustration&search_ai_type=false&mode=partial_match_for_tags&order=popular_desc`,
    );
    let random = await Func.random(search.illusts);
    let cap = `*• Caption :* ${random.caption}
*• Author :* ${random.user.name}
*• Tags :* ${random.tags.map((a) => a.name).join(" ,")}`;
conn.sendButton(m.chat,[["NEXT IMAGE",`${usedPrefix + command} ${text}`]],m, {
body: cap,
url: "https://pixiv.re/" + random.id + ".png"
})
  } catch (e) {
    q;
    throw eror;
  }
};
handler.help = ["pixiv"].map((a) => a + " *[query]*");
handler.tags = ["internet"];
handler.command = ["pixiv"];

module.exports = handler;