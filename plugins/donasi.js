const fs = require('fs');
const { generateWAMessageFromContent, proto, prepareWAMessageMedia } = require("@whiskeysockets/baileys");

const handler = async (m, { conn }) => {
  let ppUrl = await conn.profilePictureUrl(m.sender, 'image').catch((_) => "https://telegra.ph/file/1dff1788814dd281170f8.jpg");
  let payText = `Ini adalah qris atau nomor dana yang mau donasi terimakasih`;

  // Persiapan media gambar
  const media = await prepareWAMessageMedia({ image: { url: 'https://telegra.ph/file/d03d338f5fef1c7bf01d7.jpg' } }, { upload: conn.waUploadToServer });

  let msg = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
    viewOnceMessage: {
      message: {
        "messageContextInfo": {
          "deviceListMetadata": {},
          "deviceListMetadataVersion": 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.create({
          contextInfo: {
            mentionedJid: [m.sender],
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: '1203632820797364@newsletter',
              newsletterName: 'Powered By Christy',
              serverMessageId: -1
            },
            businessMessageForwardInfo: { businessOwnerJid: conn.decodeJid(conn.user.id) },
            externalAdReply: {
              title: 'Christy - MD',
              thumbnailUrl: 'https://telegra.ph/file/d03d338f5fef1c7bf01d7.jpg',
              sourceUrl: 'https://whatsapp.com/channel/0029VaX3jOgAe5VguykGye3k',
              mediaType: 1,
              renderLargerThumbnail: true
            }
          },
          body: proto.Message.InteractiveMessage.Body.create({
            text: payText
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: 'Donasi dengan nomor klik di bawah'
          }),
          header: proto.Message.InteractiveMessage.Header.create({
            title: `*Hello, @${m.sender.replace(/@.+/g, '')}!*`,
            subtitle: "ritz",
            hasMediaAttachment: true,
            ...media
          }),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons: [
              {
                name: "cta_copy",
                buttonParamsJson: `{\"display_text\":\"nomor dana\",\"id\":\"123456789\",\"copy_code\":\"083187610223\"}`
              }
            ]
          })
        })
      }
    }
  }), { userJid: m.chat, quoted: m });

  await conn.relayMessage(m.chat, msg.message, {
    messageId: msg.key.id
  });
}

handler.command = /^(donasi|donate)$/i;
handler.tags = ['info'];
handler.help = ['donasi', 'donate'];

module.exports = handler;