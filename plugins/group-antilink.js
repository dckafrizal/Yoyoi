let handler = async (
  m,
  { isAdmin, isOwner, isBotAdmin, conn, args, usedPrefix, command },
) => {
  let chat = global.db.data.chats[m.chat];
  let prefix = usedPrefix;
  let bu = `*[ ✓ ] Success turned on anti link on this group*`.trim();

  let isClose = {
    on: true,
    off: false,
  }[args[0] || ""];
  if (isClose === undefined) {
    var text5 = `*[ ${command.toUpperCase()} EXAMPLE ]*:
> *• Example :* ${usedPrefix + command} on
> *• Example :* ${usedPrefix + command} off`;
    m.reply(text5);

    throw false;
  } else if (isClose === false) {
    chat.antiLink = isClose;
    await m.reply("*[ ✓ ] Successfully turned off anti link on this group*");
  } else if (isClose === true) {
    chat.antiLink = isClose;
    await m.reply(bu);
  } else if (isClose === undefined) {
    var te = `*[ ${command.toUpperCase()} EXAMPLE ]*:
> *• Example :* ${usedPrefix + command} on
> *• Example :* ${usedPrefix + command} off`;

    m.reply(te);
  }
};

handler.help = ["antilink *[open/close]*"];
handler.tags = ["group"];
handler.command = ["antilink"];
handler.group = true;
handler.admin = true;
handler.botAdmin = false;

module.exports = handler;
