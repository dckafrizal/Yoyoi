let handler = async (m, { args }) => {
  if (args.length !== 1) {
    throw 'Silakan masukkan total point yang ingin dipertaruhkan! Contoh: .spin 1000'
  }
  let bet = parseInt(args[0])
  if (isNaN(bet) || bet < 1000) {
    throw 'Total point yang ingin dipertaruhkan harus lebih dari atau sama dengan 1000!'
  }

  let message = ''
  let pointAwal = global.db.data.users[m.sender].point || 0
  if (pointAwal < bet) {
    throw 'Maaf, kamu tidak memiliki cukup point untuk memainkan game spin.\n\nSilahkan ketik *.moneytopoint* untuk menambah point agar bisa memainkan game ini!'
  }
  let users = global.db.data.users[m.sender]
  let time = users.lastspin + 30000 // Ganti 3600000 menjadi 30000
  if (new Date - users.lastspin < 30000) throw `Fitur *Spin* telah di batasi agar tidak spam!\n\n${msToTime(time - new Date())}` // Ganti 3600000 menjadi 30000
  
  let pointAkhir = pointAwal - bet
  let spinResult = [
    { value: 0, sign: '-' },
    { value: 0, sign: '-' },
    { value: 0, sign: '-' }
  ]

  let winProbabilities = [
    { value: 15, maxWin: 25000, sign: '+' },  // Adjusted win probability
    { value: 10, maxWin: 50000, sign: '+' },  // Adjusted win probability
    { value: 5, maxWin: 250000, sign: '+' }   // Adjusted win probability
  ]

  for (let i = 0; i < spinResult.length; i++) {
    let rand = Math.floor(Math.random() * 100) + 1
    let winProb = winProbabilities[i].value
    if (rand <= winProb) {
      let winAmount = Math.floor(Math.random() * winProbabilities[i].maxWin) + bet
      pointAkhir += winAmount
      spinResult[i].value = winAmount
      spinResult[i].sign = '+'
    } else {
      let loseAmount = Math.floor(Math.random() * 10000) + 2000
      pointAkhir -= loseAmount
      spinResult[i].value = loseAmount
    }
  }

  if (pointAkhir < 0) {
    pointAkhir = 0
  }

  message += 'Hasil Spin Kamu Adalah\n\n'
  for (let i = 0; i < spinResult.length; i++) {
    let value = spinResult[i].value
    let sign = spinResult[i].sign
    message += `    ${sign} ${value.toString().padStart(7)}\n`
  }
  message += '\n• Total : ' + (pointAkhir - pointAwal).toString()
  message += '\n\npoint kamu sekarang: ' + pointAkhir.toString()

  global.db.data.users[m.sender].point = pointAkhir
  global.db.write()

  users.lastspin = new Date * 1
  await new Promise(resolve => setTimeout(resolve, 1000))
  await conn.sendMessage(m.chat, {
    react: {
      text: '💵',
      key: m.key,
    }
  })
  conn.sendMessage(m.chat, {
        text: message,
        contextInfo: {
            mentionedJid: [m.sender],
            externalAdReply: {
                title: `🎰 S P I N`,
                thumbnailUrl: 'https://telegra.ph/file/a5350c263c9d4f324b4fd.jpg',
                sourceUrl: '',
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m });
}

handler.help = ['spin <total point>']
handler.tags = ['game']
handler.command = /^spin$/i
handler.game = true
handler.register = true
handler.limit = true

module.exports = handler

function msToTime(duration) {
    var seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24)
    hours = (hours < 10) ? "0" + hours : hours
    minutes = (minutes < 10) ? "0" + minutes : minutes
    seconds = (seconds < 10) ? "0" + seconds : seconds
    return minutes + " menit " + seconds + " detik"
}