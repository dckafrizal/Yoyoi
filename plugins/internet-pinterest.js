let handler = async (m, { conn, usedPrefix, text, args, command }) => {
  if (!args || args.length < 1) {
    return m.reply(Func.example(usedPrefix, command, "shinomiya Kaguya"));
  }

  let response = args.join(" ").split(" --");
  let query = response[0];
  let count = parseInt(response[1]);
  m.reply(wait);
  if (!count) {
    try {
      var tio = await Scraper.Other.searchPinterest(query);
      let url = tio.result[Math.floor(Math.random() * tio.result.length)];
      conn.sendButton(m.chat,[["NEXT IMAGE",`${usedPrefix + command} ${text}`]],m, {
 body: `*• Media:* ${url}\n*• Result Search from:* ${query}`,
url: url
})
    } catch (error) {
      console.log(error);
      conn.reply(m.chat, "Terjadi kesalahan saat menjalankan perintah.", m);
    }
  } else {
    if (count > 10) return m.reply("*Maximun 10 request*");

    try {
      let res = await Scraper.Other.searchPinterest(query);

      let images = res.result;

      for (let i = 0; i < count; i++) {
        let image = images[Math.floor(Math.random() * images.length)];
        setTimeout(() => {
           conn.sendButton(m.chat,[["OWNER",".owner"]],m, {
 body:    `*• Media*: *(${i + 1}/${count})*\n*•Media url:* ${res.result[0 + count]}\n*• Result Search from:* ${query}`,
url: image
})
        }, i * 5000);
      }
    } catch (error) {
      console.log(error);
      m.reply(eror);
    }
  }
};

handler.help = ["pinterest"].map((a) => a + " *[query -- count]*");
handler.tags = ["tools", "internet"];
handler.command = ["pinterest", "pin"];

module.exports = handler;