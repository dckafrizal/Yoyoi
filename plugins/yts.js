let handler = async(m, { conn, text }) => {
if(!text) throw "Contoh penggunaan: .yts can i be him"
let yts = require('yt-search')
let { generateWAMessageFromContent, prepareWAMessageMedia, proto } = require("@whiskeysockets/baileys") 
let anu = (await yts(text)).all
let video = anu.filter(v => v.type === 'video') 
let channel = anu.filter(v => v.type === 'channel') 
let teks = `${channel.map(v => `*${v.name}* (${v.url})\n_${v.subCountLabel} (${v.subCount}) Subscriber_\n${v.videoCount} video\n────────────────`.trim()

).join("\n")}`+`${video.map(v =>  `*${v.title}* (${v.url})\nDuration: ${v.timestamp}\nUploaded ${v.ago}
\n${v.views} views\n─────────────────`.trim() ).join("\n")}`
let image = 'https://telegra.ph/file/c7d54daa8644eeaa1bb2f.jpg';

let sections = [{
		title: 'Christy MD By Ritz ♡', 
		highlight_label: 'start chats', 
		rows: [{
			header: 'Christy', 
	title: "Menu",
	description: `kembali ke menu !`, 
	id: '.menu'
	},
	{
		header: 'Christy', 
		title: "Owner Bot", 
		description: "Owner bot, pemilik Christy", 
		id: '.owner'
	}]
}]

video.forEach(async(data) => {
sections.push({
	title: data.title, 
	rows: [{
		title: "Get Video", 
		description: `Get video from "${data.title}"`, 
		id: `.ytmp4 ${data.url}`
		}, 
		{
		title: "Get Audio", 
		description: `Get audio from "${data.title}"`, 
		id: `.ytmp3 ${data.url}`
		}]
	}) 
}) 
let listMessage = {
    title: 'Click here!', 
    sections
};

let msg = generateWAMessageFromContent(m.chat, {
  viewOnceMessage: {
    message: {
        "messageContextInfo": {
          "deviceListMetadata": {},
          "deviceListMetadataVersion": 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.create({
          body: proto.Message.InteractiveMessage.Body.create({
            text: '*Powered By Ritz*\n_Silahkan pilih format yang anda inginkan dibawah_',
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: 'Christy MD By Ritz ♡',
          }),
          header: proto.Message.InteractiveMessage.Header.create({
            subtitle: 'Christy MD By Ritz ♡',
            hasMediaAttachment: true,...(await prepareWAMessageMedia({ image: { url: image }}, { upload: conn.waUploadToServer })) 
          }),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons: [
              {
                "name": "single_select",
                "buttonParamsJson": JSON.stringify(listMessage) 
              }, 
              {
                "name": "quick_reply",
                "buttonParamsJson": "{\"display_text\":\"Pemilik bot\",\"id\":\".owner\"}"           
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

handler.command = ['ytsearch','yts']
handler.help = 'ytsearch'
handler.tags = 'search'

module.exports = handler