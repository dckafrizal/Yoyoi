let fetch = require('node-fetch')
let handler = async (m, {
    conn,
    command,
    isOwner
}) => {
let sections = [{
rows: [{
title: 'Menu',
description: 'List of available bot menus',
id: '.menu'
}, {
title: 'Owner',
description: 'Owner of the bot',
id: '.owner'
}]
}]

let listMessage = {
    title: 'Menu Bot', 
    sections
};

const { generateWAMessageFromContent, proto } = require("@whiskeysockets/baileys") 
let msg = generateWAMessageFromContent(m.chat, {
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
			newsletterJid: '120363251106848970@newsletter',
			newsletterName: 'Powered by Whatsapp', 
			serverMessageId: -1
		},
	businessMessageForwardInfo: { businessOwnerJid: conn.decodeJid(conn.user.id) },
	forwardingScore: 256,
            externalAdReply: {  
                title: 'CHRISTY MD', 
                thumbnailUrl: 'https://telegra.ph/file/3bfb5f74d05b716c7f644.jpg', 
                sourceUrl: 'https://chat.whatsapp.com/HFh6WiecebfB0rLu3HC8dH',
                mediaType: 2,
                renderLargerThumbnail: true
            }
          }, 
          body: proto.Message.InteractiveMessage.Body.create({
            text: `\n*Hello, @${m.sender.replace(/@.+/g, '')}!*\nAku Christy Senang bertemu denganmu~\nApa ada yang bisa saya bantu?\nSilahkan pilih opsi dibawah ini!`
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: ''
          }),
          header: proto.Message.InteractiveMessage.Header.create({
            subtitle: "Ritz",
            hasMediaAttachment: false
          }),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons: [
              {
                "name": "single_select",
                "buttonParamsJson": JSON.stringify(listMessage) 
              }
           ],
          })
        })
    }
  }
}, {})

await conn.relayMessage(msg.key.remoteJid, msg.message, {
  messageId: msg.key.id
})
}
handler.customPrefix = /^(bot|bot?|bott)$/i
handler.command = new RegExp

module.exports = handler