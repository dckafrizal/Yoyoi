let handler = async (m, { conn, usedPrefix, command, isAdmin }) => {
  if (!m.quoted)
    throw `*• Example :* ${usedPrefix + command} *[reply Message]*`;
 try {
 if (isAdmin) {
    let delet = m.message.extendedTextMessage.contextInfo.participant;
    let bang = m.message.extendedTextMessage.contextInfo.stanzaId;
    return conn.sendMessage(m.chat, {
      delete: {
        remoteJid: m.chat,
        fromMe: false,
        id: bang,
        participant: delet,
      },
    });
} else return m.quoted.delete()
  } catch(e) {
     throw eror
  }
};
handler.help = ["delete", "del"].map((a) => a + " *[reply message]*");
handler.tags = ["group"];
handler.command = ["del", "delete"];
handler.group = true 

module.exports = handler;