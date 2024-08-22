let handler = async (m, { conn, text }) => {
  let user = global.db.data.users[m.sender]
  let opponent = m.mentionedJid[0]
  
  if (!user || !global.db.data.users[opponent]) {
    return conn.reply(m.chat, '• *Example :* .bertarung @user', m)
  }
  
  if (user.lastWar && (new Date - user.lastWar) < 18000000) { // 5 jam dalam milidetik
    let remainingTime = Math.ceil((18000000 - (new Date() - user.lastWar)) / 1000)
    let hours = Math.floor(remainingTime / 3600)
    let minutes = Math.floor((remainingTime % 3600) / 60)
    return conn.reply(m.chat, `Anda harus menunggu ${hours} jam ${minutes} menit ${remainingTime % 60} detik sebelum dapat bertarung lagi`, m)
  }
    
	conn.sendMessage(m.chat, {
		react: {
			text: '🕒',
			key: m.key,
		}
	})
  
  let alasanKalah = `${pickRandom(['bodoh gitu doang aja kalah tolol lu di denda','lemah lu kontol mending lu di rumah aja dah lu di denda dek','Jangan beratem kalo cupu dek wkwkwk kamu di denda','Dasar tolol lawan itu doang aja ga bisa lu di denda','Hadehh sono lu mending di rumah aja deh lu di denda'])}`
  let alasanMenang = `${pickRandom(['kamu berhasil menggunakan kekuatan elemental untuk menghancurkan pertahanan lawan dan mendapatkan','kamu berhasil melancarkan serangan mematikan dengan gerakan akrobatik yang membingungkan lawan, dan mendapatkan','Kamu berhasil menang karena baru selesai coli dan mendapatkan','Kamu berhasil menang karena menyogok lawan dan mendapatkan','Kamu berhasil menang karena bot merasa kasihan sama kamu dan mendapatkan','Kamu berhasil menang karena kamu melawan orang cupu dan mendapatkan'])}`

  let betAmount = Math.floor(Math.random() * 3000000) + 10000 // Maksimal 3 juta, minimal 10 ribu
  
  if (betAmount > 3000000) {
    betAmount = 3000000; // Jika lebih dari 3 juta, atur ke 3 juta
  }

  
  if (user.money < betAmount) {
    return conn.reply(m.chat, 'Uang Anda tidak mencukupi', m)
  }
  
  conn.reply(m.chat, 'Mempersiapkan arena...', m)
  
  setTimeout(() => {
    conn.reply(m.chat, 'Mendapatkan arena...', m)
    
    setTimeout(() => {
      conn.reply(m.chat, 'Bertarung...', m)
      
      setTimeout(() => {
        let result = Math.random() >= 0.5 
        let wonAmount = result ? betAmount : -betAmount 
        
        user.money += wonAmount
        global.db.data.users[opponent].money -= wonAmount
        
        let opponentName = conn.getName(opponent) 
        
        let caption = `❏  *F I G H T*\n\n`
        caption += `Lawan Anda Adalah: ${opponentName}\nLevel: [${global.db.data.users[m.sender].level}]\n\n`
        
        if (result) {
          caption += `*Menang!*, ${alasanMenang},+${betAmount} Money\n`
          caption += `Uang Anda saat ini: ${user.money}\n`
          conn.sendFile(m.chat, 'https://telegra.ph/file/e3d5059b970d60bc438ac.jpg', 'You_Win.jpg', caption, m)
        } else {
          caption += `*kalah!*, ${alasanKalah},-${betAmount} Money\n`
          caption += `Uang Anda saat ini: ${user.money}\n`
          conn.sendFile(m.chat, 'https://telegra.ph/file/86b2dc906fb444b8bb6f7.jpg', 'You_Lose.jpg', caption, m)
        }

        user.lastWar = new Date() 
        
        setTimeout(() => {
          conn.reply(m.chat, `Anda dapat bertarung lagi setelah 5 detik`, m)
        }, 5000) // https://github.com/SazumiVicky/MakeMeow-Games
      }, 2000)
    }, 2000) 
  }, 2000) 
}

handler.help = ['bertarung *@user*', 'fight *@user*']
handler.tags = ['rpg']
handler.command = /^(fight|bertarung)$/i
handler.group = true
handler.rpg = true
handler.cooldown = 5000 // 5 jam

module.exports = handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}