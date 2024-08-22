let handler = async (m, { conn, text, usedPrefix, command }) => {
  let id = Object.keys(await conn.groupFetchAllParticipating());
  let array = [];
  for (let i of id) {
    let name = await conn.getName(i);
    let data = await conn.groupMetadata(i);
    let chat = db.data.chats[i];
    array.push({
      name: name,
      id: i,
      member: data.size,
      owner: data.owner,
      welcome: chat.welcome,
      antilink: chat.antiLink,
      chat: chat.chat,
    });
  }

  let cap = array
    .map(
      (a, i) =>
        `*${i + 1}.* ${a.name}\n*• ID :* ${a.id}\n*• Total member :* ${a.member}\n*• Owner :* ${a.onwer ? `wa.me/${a.owner.split("@")[0]}` : "Nothing"}\n*• Welcome :* ${a.welcome ? "✅" : "❌"}\n*• Antilink :* ${a.antilink ? "✅" : "❌"}\n*• Total Chat :* ${a.chat}`,
    )
    .join("\n\n");

  m.reply(cap);
};
handler.help = ["listgc", "gcl"].map((a) => a + " *[view all group join]*");
handler.tags = ["info"];
handler.command = ["listgc", "gcl"];
module.exports = handler;