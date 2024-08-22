let handler = async (m, { conn, text, usedPrefix, command }) => {
  conn.nekopoi = conn.nekopoi ? conn.nekopoi : {};
  if (!text)
    throw `*] NEKOPOI EXAMPLE ]*
> *• Example :* ${usedPrefix + command} search *[query]*
> *• Example :* ${usedPrefix + command} detail *[url/number]*
> *• Example :* ${usedPrefix + command} latest *[get latest]*`;
  const keyword = text.split(" ")[0];
  const data = text.slice(keyword.length + 1);
  if (keyword === "search") {
    if (!data) throw ` *• Example :* ${usedPrefix + command} search *[query]*`;
    const search = await Func.fetchJson(
      "https://akane.my.id/api/nekopoi/search?query=" + data,
    );
    if (!search.data) throw search.msg;
    let list = search.data
      .map(
        (a, i) => `*${i + 1}* ${a.title}
      • *Genre :* ${a.genre}
      • *Produsers :* ${a.producers}
      • *Duration :* ${a.duration}
      • *Size :* ${a.size}`,
      )
      .join("\n\n");
    let reply = await conn.reply(
      m.chat,
      `*[ ${data.toUpperCase()} SEARCH ]*\n` + list,
      m,
    );

    await conn.reply(
      m.chat,
      `*[ INPUT 1 - ${search.data.length} ]*\n> • _type ${usedPrefix + command} detail *[number]* to get detail_`,
      reply,
    );
    conn.nekopoi[m.sender] = search;
  } else if (keyword === "detail") {
    if (!data)
      throw `*• Example :* ${usedPrefix + command} detail *[url/number]*`;
    if (await Func.isUrl(data)) {
      let detail = await Func.fetchJson(
        "https://akane.my.id/api/nekopoi/detail?url=" + data,
      );
      if (!detail.data) throw detail.msg;
      let cap = `*[ NEKOPOI DETAIL ]*
*• Title :* ${detail.data.title}
*• Genre :* ${detail.data.genre}
*• Produsers :* ${detail.data.producers}
*• Duration :* ${detail.data.duration}
*• Streami :* ${detail.data.stream} *[ Click For Watch ]*
*• Sinopsis :* ${detail.data.sinopsis}`;
      m.reply(cap, detail.data.img);
    } else {
      if (isNaN(data))
        throw `*• Example :* ${usedPrefix + command} detail *[url/number]*`;
      let link = conn.nekopoi[m.sender].data[data - 1].link;
      let detail = await Func.fetchJson(
        "https://akane.my.id/api/nekopoi/detail?url=" + link,
      );
      if (!detail.data) throw detail.msg;
      let cap = `*[ NEKOPOI DETAIL ]*
*• Title :* ${detail.data.title}
*• Genre :* ${detail.data.genre}
*• Produsers :* ${detail.data.producers}
*• Duration :* ${detail.data.duration}
*• Streami :* ${detail.data.stream} *[ Click For Watch ]*
*• Sinopsis :* ${detail.data.sinopsis}`;
      m.reply(cap, detail.data.img);
    }
  } else if (keyword === "latest") {
    let list = await Func.fetchJson("https://akane.my.id/api/nekopoi/latest");
    m.reply(
      list.data
        .map(
          (a, i) => `*${i + 1}.* ${a.title.toUpperCase()}
*• Upload :* ${a.upload}
*• Link :* ${a.link}`,
        )
        .join("\n\n"),
      list.data[0].image,
    );
  }
};
handler.help = ["nekopoi"].map((a) => a + " *[premium only]*");
handler.tags = ["anime", "premium"];
handler.command = ["nekopoi"];
handler.premium = true;

module.exports = handler;
