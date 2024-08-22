let handler = async (
  m,
  { conn, isAdmin, isOwner, args, usedPrefix, command },
) => {
  let isClose = {
    open: "not_announcement",
    buka: "not_announcement",
    on: "not_announcement",
    1: "not_announcement",
    close: "announcement",
    tutup: "announcement",
    off: "announcement",
    0: "announcement",
  }[args[0] || ""];
  if (isClose === undefined) {
    let caption = `*• Example :* ${usedPrefix + command} *[buka/tutup duration]*`;
    m.reply(caption);
    throw false;
  }
  let timeoutset = (86400000 * args[1]) / 24;
  await conn.groupSettingUpdate(m.chat, isClose).then(async (_) => {
    m.reply(
      `Success ${isClose == "announcement" ? "close" : "open"} group${args[1] ? `, the group will be opened after *${clockString(timeoutset)}*` : ""}`,
    );
  });
  if (args[1]) {
    setTimeout(async () => {
      await conn
        .groupSettingUpdate(
          m.chat,
          `${isClose == "announcement" ? "not_announcement" : "announcement"}`,
        )
        .then(async (_) => {
          conn.reply(
            m.chat,
            `Group has been ${isClose == "not_announcement" ? "closed, now only admins can send messages" : "open, now all members can send messages"}!`,
          );
        });
    }, timeoutset);
  }
};
handler.help = ["grouptime", "gctime"].map(
  (a) => a + " *[buka/tutup duration]*",
);
handler.tags = ["group"];
handler.command = ["gctime", "grouptime"];
handler.botAdmin = true;
handler.group = true;
handler.admin = true;

module.exports = handler;

function clockString(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor(ms / 60000) % 60;
  let s = Math.floor(ms / 1000) % 60;
  console.log({ ms, h, m, s });
  return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(":");
}
