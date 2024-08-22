const {
  generateWAMessageFromContent,
  proto,
  prepareWAMessageMedia,
} = require("@whiskeysockets/baileys");

let handler = async (m, { conn, text, usedPrefix, command }) => {
  let res = await (
    await fetch(
      `https://raw.githubusercontent.com/KazukoGans/database/main/anime/${command}.json`,
    )
  ).json();
  let cita = res[Math.floor(Math.random() * res.length)];
  let msg = generateWAMessageFromContent(
    m.chat,
    {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2,
          },
          interactiveMessage: proto.Message.InteractiveMessage.create({
            body: proto.Message.InteractiveMessage.Body.create({
              text: `*• Result from :* \`${command}\``,
            }),
            footer: proto.Message.InteractiveMessage.Footer.create({
              text: namebot,
            }),
            header: proto.Message.InteractiveMessage.Header.create({
              hasMediaAttachment: true,
              ...(await prepareWAMessageMedia(
                { image: { url: cita }, fileLength: 1000000000000 },
                { upload: conn.waUploadToServer },
              )),
            }),
            nativeFlowMessage:
              proto.Message.InteractiveMessage.NativeFlowMessage.create({
                buttons: [
                  {
                    name: "quick_reply",
                    buttonParamsJson: `{\"display_text\":\"🖼️ Next Image\",\"id\":\"${usedPrefix + command}\"}`,
                  },
                ],
              }),
          }),
        },
      },
    },
    {},
  );

  await conn.relayMessage(msg.key.remoteJid, msg.message, {
    messageId: msg.key.id,
  });
};
handler.help = [
  "akira",
  "akiyama",
  "anna",
  "asuna",
  "ayuzawa",
  "boruto",
  "chitanda",
  "chitoge",
  "deidara",
  "doraemon",
  "elaina",
  "emilia",
  "asuna",
  "erza",
  "gremory",
  "hestia",
  "hinata",
  "inori",
  "itachi",
  "isuzu",
  "itori",
  "kaga",
  "kagura",
  "kakasih",
  "kaori",
  "kaneki",
  "kosaki",
  "kotori",
  "kuriyama",
  "kuroha",
  "kurumi",
  "madara",
  "mikasa",
  "miku",
  "minato",
  "naruto",
  "natsukawa",
  "nekohime",
  "nezuko",
  "nishimiya",
  "onepiece",
  "pokemon",
  "rem",
  "rize",
  "sagiri",
  "sakura",
  "sasuke",
  "shina",
  "shinka",
  "shizuka",
  "shota",
  "tomori",
  "toukachan",
  "tsunade",
  "yatogami",
  "yuki",
].map((a) => a + " *[random image]*");
handler.tags = ["anime"];
handler.command = [
  "akira",
  "akiyama",
  "anna",
  "asuna",
  "ayuzawa",
  "boruto",
  "chitanda",
  "chitoge",
  "deidara",
  "doraemon",
  "elaina",
  "emilia",
  "asuna",
  "erza",
  "gremory",
  "hestia",
  "hinata",
  "inori",
  "itachi",
  "isuzu",
  "itori",
  "kaga",
  "kagura",
  "kakasih",
  "kaori",
  "kaneki",
  "kosaki",
  "kotori",
  "kuriyama",
  "kuroha",
  "kurumi",
  "madara",
  "mikasa",
  "miku",
  "minato",
  "naruto",
  "natsukawa",
  "nekohime",
  "nezuko",
  "nishimiya",
  "onepiece",
  "pokemon",
  "rem",
  "rize",
  "sagiri",
  "sakura",
  "sasuke",
  "shina",
  "shinka",
  "shizuka",
  "shota",
  "tomori",
  "toukachan",
  "tsunade",
  "yatogami",
  "yuki",
];
handler.limit = true;

module.exports = handler;
