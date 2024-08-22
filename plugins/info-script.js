let handler = async (m, { conn, usedPrefix: _p, __dirname, args }) => {
const pp = await conn.profilePictureUrl(m.sender, 'image').catch((_) => "https://telegra.ph/file/1ecdb5a0aee62ef17d7fc.jpg");
conn.sendFile(m.chat,'./mp3/script.opus',null,null, fkontak, true, {
  contextInfo: {
    externalAdReply: {
      showAdAttribution: true,
      title: '‼️ INFO TENTANG SC INI',
      body: 'PRIVATE SC!!',
 mediaType: 2,
mediaUrl: sig,
      thumbnailUrl: pp,
renderLargerThumbnail: true,
      sourceUrl: null
    }
  }
})
setTimeout(() => {
conn.relayMessage(m.chat, {
    requestPaymentMessage: {
      currencyCodeIso4217: 'Rp',
      amount1000: 70000 * 100,
      requestFrom: m.sender,
      noteMessage: {
        extendedTextMessage: {
          text: ` *[ I N F O   S C R I P T ]*

         ° NAME : Christy MD
        °   VERSION : ${version}
      °  OWNER : Always Ritz
   °TYPE SCRIPT : PLUGINS

*⁉️ want to buy source code? please chat owner*
wa.me/${nomorown}?text=assalamualaikum+bang+saya+mau+sc+christy`,
          contextInfo: {
            mentionedJid: [nomorown],
            externalAdReply: {
              showAdAttribution: true
            }
          }
        }
      }
    }
  }, {})
} , 8000)
}
handler.help = ['sc', 'sourcecode']
handler.tags = ['info']
handler.command = /^(sc|sourcecode)$/i
handler.register = false

module.exports = handler