let handler = async (m, { conn, text, usedPrefix, command }) => {
  m.reply(
    `*[ INFO RUNTIME BOT ]*\n> • *Bot  Runtime:* ${await Func.toDate(process.uptime() * 1000)}\n> • *Os Runtime:* ${await Func.toDate(require("os").uptime() * 1000)}`,
  );
};
handler.help = ["runtime", "uptime"].map((a) => a + " *[Runtime bot]*");
handler.tags = ["info"];
handler.command = ["runtime", "uptime"];
module.exports = handler;
