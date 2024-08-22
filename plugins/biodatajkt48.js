let handler = async (m, { conn }) => {
conn.sendMessage(m.chat, { react: { text: '🍺', key: m.key }})
  const { proto, generateWAMessageFromContent, prepareWAMessageMedia } = require("@whiskeysockets/baileys") 
	
	const msg = generateWAMessageFromContent(m.chat, {
  viewOnceMessage: {
    message: {
      messageContextInfo: {
        deviceListMetadata: {},
        deviceListMetadataVersion: 2
      },
      interactiveMessage: proto.Message.InteractiveMessage.fromObject({
      contextInfo: {
        	mentionedJid: [m.sender], 
        	isForwarded: true, 
	        forwardedNewsletterMessageInfo: {
			newsletterJid: '0@newsletter',
			newsletterName: 'Powered By Ritz', 
			serverMessageId: -1
		},
	businessMessageForwardInfo: { businessOwnerJid: conn.decodeJid(conn.user.id) },
	forwardingScore: 256,
            externalAdReply: {  
                title: 'Ritz', 
                thumbnailUrl: 'https://telegra.ph/file/3bfb5f74d05b716c7f644.jpg', 
                sourceUrl: 'https://chat.whatsapp.com/HFh6WiecebfB0rLu3HC8dH',
                mediaType: 2,
                renderLargerThumbnail: false
            }
          }, 
        body: proto.Message.InteractiveMessage.Body.fromObject({
          text: `*Hello, @${m.sender.replace(/@.+/g, '')}!*\n> </>BIODATA MEMBER JKT 48</>
`
        }),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({
          text: ''
        }),
        header: proto.Message.InteractiveMessage.Header.fromObject({
          hasMediaAttachment: false
        }),
        carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
          cards: [
            {
              body: proto.Message.InteractiveMessage.Body.fromObject({
            text: '> *Peduli dan Berbaik Hati..*\n> *Siapakah Dia*\n> *Chris... (ty!!)*\n> *Halo semua Aku CHRISTY*\n\n`<//> Biodata Christy <//>`\n> Nama : *Angelina Christy*\n> Ultah : *05-December-2005*\n> TTL : *Jakarta*\n> Golongan Darah : *O*\n> Zodiac : *Sagitarius*\n> Hobi : *Menari*'
              }),
              footer: proto.Message.InteractiveMessage.Footer.fromObject({
              }),
              header: proto.Message.InteractiveMessage.Header.fromObject({
                title: '`</> Jiko Christy Jkt48 </>`\n',
                hasMediaAttachment: true,...(await prepareWAMessageMedia({ image: { url: 'https://telegra.ph/file/3bfb5f74d05b716c7f644.jpg' } }, { upload: conn.waUploadToServer }))
              }),
              nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                buttons: [
                  {
                    name: "cta_url",
                buttonParamsJson: `{"display_text":"INSTAGRAM OWNER","url":"https://www.instagram.com/ritz.404/","merchant_url":"https://www.instagram.com/ritz.404/"}`
                  }
                  ]
              })
            },
            {
              body: proto.Message.InteractiveMessage.Body.fromObject({
                text: '> *Gadis Koleris yang suka berimajinasi..*\n> *terangi harimu dengan senyuman karamelku.*\n> *Halo, aku Freya!*\n\n`<//> Biodata Freya <//>`\n> Nama : *Freyanashifa Jayawardana*\n> Ultah : *February 13, 2006*\n> TTL : *Tangerang*\n> Golongan Darah : *B*\n> Zodiac : *Aquarius*\n> Hobi : *Menari*'
              }),
              footer: proto.Message.InteractiveMessage.Footer.fromObject({
              }),
              header: proto.Message.InteractiveMessage.Header.fromObject({
                title: '`</> Jiko Freya Jkt48 </>`\n',
                hasMediaAttachment: true,...(await prepareWAMessageMedia({ image: { url: 'https://telegra.ph/file/38805f5b4750d2ffdf03b.jpg' } }, { upload: conn.waUploadToServer }))
              }),
              nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                buttons: [
                  {
                   name: "cta_url",
                buttonParamsJson: `{"display_text":"INSTAGRAM OWNER","url":"https://www.instagram.com/ritz.404/","merchant_url":"https://www.instagram.com/ritz.404/"}`
                    }
                  ]
              })
            },
            {
              body: proto.Message.InteractiveMessage.Body.fromObject({
                text: '> *Si gadis tomboy..*\n> *yang semangatnya meletup-letup!.*\n> *Halo semuanya, aku Zee.*\n\n`<//> Biodata Zee <//>`\n> Nama : *Azizi Shafaa Asadel*\n> Ultah : *16 Mei 2004*\n> TTL : *Jakarta*\n> Golongan Darah : *O*\n> Zodiac : *Taurus*\n> Hobi : *Menari*'
              }),
              footer: proto.Message.InteractiveMessage.Footer.fromObject({
              }),
              header: proto.Message.InteractiveMessage.Header.fromObject({
                title: '`</> Jiko Zee Jkt48 </>`\n',
                hasMediaAttachment: true,...(await prepareWAMessageMedia({ image: { url: 'https://telegra.ph/file/10d95919ae261498688d5.jpg' } }, { upload: conn.waUploadToServer }))
              }),
              nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                buttons: [
                  {
                    name: "cta_url",
                buttonParamsJson: `{"display_text":"INSTAGRAM OWNER","url":"https://www.instagram.com/ritz.404/","merchant_url":"https://www.instagram.com/ritz.404/"}`
                  }
                  ]
              })
            }
          ]
        })
      })
    }
  }
}, { userJid: m.chat, quoted: m })
conn.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id })
}
handler.help = ['Jkt48', 'Biodata Jkt48']
handler.tags = ['main']
handler.command = /^(biodatajkt48|jktbiodata)$/i
handler.private = false

module.exports = handler


