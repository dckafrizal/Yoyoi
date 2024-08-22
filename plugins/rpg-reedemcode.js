let handler = async (m, { conn, args }) => {
    if (args.length === 0) return conn.reply(m.chat, 'Silakan masukkan kode redeem!', m)
    
    let kodeValid = ['axellganteng', 'axelltampan', 'axellidamanmertua', 'axellsangraja', 'axellimut', 'axelllucu', 'axellkeren', 'axellcool', 'axellsayangmamah', 'axellleader', 'axellhandsome', 'axelljenius', 'axellpintar', 'axellramah', 'axellbaik', 'axellsholeh', 'axellsayangdiva', 'axelltidaksombong', 'axellsayangmember', 'axelltidakpelit', 'axellcute']; // Daftar kode redeem yang valid

    if (kodeValid.includes(args[0])) {
        if (new Date - global.db.data.users[m.sender].lastcode > 86800000) {
            global.db.data.users[m.sender].lastcode = new Date() * 1;
            global.db.data.users[m.sender].exp += 25000;
            global.db.data.users[m.sender].limit += 25;
            global.db.data.users[m.sender].bank += 25000;
            global.db.data.users[m.sender].money += 25000;
            conn.reply(m.chat, '*SELAMAT!*\n\nKamu telah mendapatkan:\n+25000 XP\n+25000 Money\n+25000 Nabung Money\n+25 Limit', m)
        } else {
            conn.reply(m.chat, 'Kode sudah digunakan, harap tunggu sampai besok!', m)
        }
    } else {
        conn.reply(m.chat, 'Kode redeem tidak valid!', m)
    }
}

handler.help = ['reedem <kode>']
handler.tags = ['rpg']
handler.command = /^reedem$/i

module.exports = handler