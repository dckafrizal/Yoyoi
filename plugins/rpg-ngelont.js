let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender]
    let lastLont = user.lastlont || 0
    let cooldown = 500000 // Waktu cooldown dalam milidetik (500000 ms = 500 detik)

    let timeDifference = new Date() - lastLont
    let remainingCooldown = cooldown - timeDifference

    if (timeDifference > cooldown || lastLont === 0) {
        user.lastlont = new Date() // Simpan waktu terakhir ke database
        // Proses yang ingin dijalankan setelah cooldown selesai
        let hsl = `Kamu telah melakukan skidipapap dan mendapatkan hadiah berikut ini:
Uang: Rp.300000
Exp: 100000
`
        conn.reply(m.chat, hsl, m)
        user.money += 300000 // Menambahkan uang
        user.exp += 100000 // Menambahkan exp
    } else {
        let remainingTime = clockString(remainingCooldown)
        conn.reply(m.chat, `Kamu sudah kecapekan, silahkan istirahat dulu selama ${remainingTime}`, m)
    }
}

handler.help = ['ngelont']
handler.tags = ['rpg']
handler.command = /^(ngelont)$/i
handler.group = true
handler.rpg = true
module.exports = handler

function clockString(ms) {
    let days = Math.floor(ms / (1000 * 60 * 60 * 24))
    let hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    let minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60))
    let seconds = Math.floor((ms % (1000 * 60)) / 1000)

    let result = []
    if (days) result.push(`${days} Hari`)
    if (hours) result.push(`${hours} Jam`)
    if (minutes) resu