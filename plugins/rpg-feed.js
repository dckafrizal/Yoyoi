let handler = async (m, { conn, args, usedPrefix }) => {
    let type = (args[0] || '').toLowerCase()
    let phonix = global.db.data.users[m.sender].phonix
    let kuda = global.db.data.users[m.sender].kuda
    let naga = global.db.data.users[m.sender].naga
    let kucing = global.db.data.users[m.sender].kucing
    let rubah = global.db.data.users[m.sender].rubah
    let griffin = global.db.data.users[m.sender].griffin
    let centaur = global.db.data.users[m.sender].centaur
    let anjing = global.db.data.users[m.sender].anjing
    let kyubi = global.db.data.users[m.sender].kyubi
    let serigala = global.db.data.users[m.sender].serigala
    switch (type) {
        case 'phonix':
            if (phonix == 0) return m.reply('*Kamu belum memiliki Pet phonix*')
            if (phonix == 5) return m.reply('*Pet kamu dah lvl max*')
            let __waktur = (new Date - global.db.data.users[m.sender].phonixlastclaim)
            let _waktur = (600000 - __waktur)
            let waktur = clockString(_waktur)
            if (new Date - global.db.data.users[m.sender].phonixlastclaim > 600000) {
                if (global.db.data.users[m.sender].makananpet > 0) {
                    global.db.data.users[m.sender].makananpet -= 1
                    global.db.data.users[m.sender].anakphonix += 20
                    global.db.data.users[m.sender].phonixlastclaim = new Date * 1
                    conn.reply(m.chat, `Berhasil memberi makan pet ${type}`, m)
                    if (phonix > 0) {
                        let naiklvl = ((phonix * 100) - 1)
                        if (global.db.data.users[m.sender].anakphonix > naiklvl) {
                            global.db.data.users[m.sender].phonix += 1
                            global.db.data.users[m.sender].anakphonix -= (phonix * 100)
                            conn.reply(m.chat, `*Selamat Pet phonix kamu naik level*`, m)
                        }
                    }
                } else m.reply(`Makanan pet kamu tidak cukup`)
            } else m.reply(`Pet kamu sudah kenyang, coba kasih makan *${waktur}* lagi`)
            break
        case 'kuda':
            if (kuda == 0) return m.reply('*Kamu belum memiliki Pet Kuda*')
            if (kuda == 5) return m.reply('*Pet kamu dah lvl max*')
            let __waktuk = (new Date - global.db.data.users[m.sender].kudalastclaim)
            let _waktuk = (600000 - __waktuk)
            let waktuk = clockString(_waktuk)
            if (new Date - global.db.data.users[m.sender].kudalastclaim > 600000) {
                if (global.db.data.users[m.sender].makananpet > 0) {
                    global.db.data.users[m.sender].makananpet -= 1
                    global.db.data.users[m.sender].anakkuda += 20
                    global.db.data.users[m.sender].kudalastclaim = new Date * 1
                    conn.reply(m.chat, `Berhasil memberi makan pet ${type}`, m)
                    if (kuda > 0) {
                        let naiklvl = ((kuda * 100) - 1)
                        if (global.db.data.users[m.sender].anakkuda > naiklvl) {
                            global.db.data.users[m.sender].kuda += 1
                            global.db.data.users[m.sender].anakkuda -= (kuda * 100)
                            conn.reply(m.chat, `*Selamat Pet Kuda kamu naik level*`, m)
                        }
                    }
                } else m.reply(`Makanan pet kamu tidak cukup`)
            } else m.reply(`Pet kamu sudah kenyang, coba kasih makan *${waktuk}* lagi`)
            break
            case 'serigala':
            if (serigala == 0) return m.reply('*Kamu belum memiliki Pet Serigala*')
            if (serigala == 5) return m.reply('*Pet kamu dah lvl max*')
            let __waktuks = (new Date - global.db.data.users[m.sender].serigalalastclaim)
            let _waktuks = (600000 - __waktuks)
            let waktuks = clockString(_waktuks)
            if (new Date - global.db.data.users[m.sender].serigalalastclaim > 600000) {
                if (global.db.data.users[m.sender].makananpet > 0) {
                    global.db.data.users[m.sender].makananpet -= 1
                    global.db.data.users[m.sender].anakserigala += 20
                    global.db.data.users[m.sender].serigalalastclaim = new Date * 1
                    conn.reply(m.chat, `Berhasil memberi makan pet ${type}`, m)
                    if (serigala > 0) {
                        let naiklvl = ((serigala * 100) - 1)
                        if (global.db.data.users[m.sender].anakserigala > naiklvl) {
                            global.db.data.users[m.sender].serigala += 1
                            global.db.data.users[m.sender].anakserigala -= (serigala * 100)
                            conn.reply(m.chat, `*Selamat Pet Serigala kamu naik level*`, m)
                        }
                    }
                } else m.reply(`Makanan pet kamu tidak cukup`)
            } else m.reply(`Pet kamu sudah kenyang, coba kasih makan *${waktuks}* lagi`)
            break
            case 'anjing':
            if (anjing == 0) return m.reply('*Kamu belum memiliki Pet Anjing*')
            if (anjing == 5) return m.reply('*Pet kamu dah lvl max*')
            let __waktukk = (new Date - global.db.data.users[m.sender].anjinglastclaim)
            let _waktukk = (600000 - __waktukk)
            let waktukk = clockString(_waktukk)
            if (new Date - global.db.data.users[m.sender].anjinglastclaim > 600000) {
                if (global.db.data.users[m.sender].makananpet > 0) {
                    global.db.data.users[m.sender].makananpet -= 1
                    global.db.data.users[m.sender].anakanjing += 20
                    global.db.data.users[m.sender].anjinglastclaim = new Date * 1
                    conn.reply(m.chat, `Berhasil memberi makan pet ${type}`, m)
                    if (anjing > 0) {
                        let naiklvl = ((anjing * 100) - 1)
                        if (global.db.data.users[m.sender].anakanjing > naiklvl) {
                            global.db.data.users[m.sender].anjing += 1
                            global.db.data.users[m.sender].anakanjing -= (anjing * 100)
                            conn.reply(m.chat, `*Selamat Pet Anjing kamu naik level*`, m)
                        }
                    }
                } else m.reply(`Makanan pet kamu tidak cukup`)
            } else m.reply(`Pet kamu sudah kenyang, coba kasih makan *${waktukk}* lagi`)
            break
            case 'kyubi':
            if (kyubi == 0) return m.reply('*Kamu belum memiliki Pet Kyubi*')
            if (kyubi == 5) return m.reply('*Pet kamu dah lvl max*')
            let __waktuts = (new Date - global.db.data.users[m.sender].kyubilastclaim)
            let _waktuts = (600000 - __waktuts)
            let waktuts = clockString(_waktuts)
            if (new Date - global.db.data.users[m.sender].kyubilastclaim > 600000) {
                if (global.db.data.users[m.sender].makananpet > 0) {
                    global.db.data.users[m.sender].makananpet -= 1
                    global.db.data.users[m.sender].anakkyubi += 20
                    global.db.data.users[m.sender].kyubilastclaim = new Date * 1
                    conn.reply(m.chat, `Berhasil memberi makan pet ${type}`, m)
                    if (kyubi > 0) {
                        let naiklvl = ((kyubi * 100) - 1)
                        if (global.db.data.users[m.sender].anakkyubi > naiklvl) {
                            global.db.data.users[m.sender].kyubi += 1
                            global.db.data.users[m.sender].anakkyubi -= (kyubi * 100)
                            conn.reply(m.chat, `*Selamat Pet Kyubi kamu naik level*`, m)
                        }
                    }
                } else m.reply(`Makanan pet kamu tidak cukup`)
            } else m.reply(`Pet kamu sudah kenyang, coba kasih makan *${waktuts}* lagi`)
            break
            case 'centaur':
            if (centaur == 0) return m.reply('*Kamu belum memiliki Pet Centaur*')
            if (centaur == 5) return m.reply('*Pet kamu dah lvl max*')
            let __waktus = (new Date - global.db.data.users[m.sender].centaurlastclaim)
            let _waktus = (600000 - __waktus)
            let waktus = clockString(_waktus)
            if (new Date - global.db.data.users[m.sender].centaurlastclaim > 600000) {
                if (global.db.data.users[m.sender].makananpet > 0) {
                    global.db.data.users[m.sender].makananpet -= 1
                    global.db.data.users[m.sender].anakcentaur += 20
                    global.db.data.users[m.sender].centaurlastclaim = new Date * 1
                    conn.reply(m.chat, `Berhasil memberi makan pet ${type}`, m)
                    if (centaur > 0) {
                        let naiklvl = ((centaur * 100) - 1)
                        if (global.db.data.users[m.sender].anakcentaur > naiklvl) {
                            global.db.data.users[m.sender].centaur += 1
                            global.db.data.users[m.sender].anakcentaur -= (centaur * 100)
                            conn.reply(m.chat, `*Selamat Pet Centaur kamu naik level*`, m)
                        }
                    }
                } else m.reply(`Makanan pet kamu tidak cukup`)
            } else m.reply(`Pet kamu sudah kenyang, coba kasih makan *${waktus}* lagi`)
            break
            case 'griffin':
            if (griffin == 0) return m.reply('*Kamu belum memiliki Pet Griffin*')
            if (griffin == 5) return m.reply('*Pet kamu dah lvl max*')
            let __waktug = (new Date - global.db.data.users[m.sender].griffinlastclaim)
            let _waktug = (600000 - __waktug)
            let waktug = clockString(_waktug)
            if (new Date - global.db.data.users[m.sender].griffinlastclaim > 600000) {
                if (global.db.data.users[m.sender].makananpet > 0) {
                    global.db.data.users[m.sender].makananpet -= 1
                    global.db.data.users[m.sender].anakgriffin += 20
                    global.db.data.users[m.sender].griffinlastclaim = new Date * 1
                    conn.reply(m.chat, `Berhasil memberi makan pet ${type}`, m)
                    if (griffin > 0) {
                        let naiklvl = ((griffin * 100) - 1)
                        if (global.db.data.users[m.sender].anakgriffin > naiklvl) {
                            global.db.data.users[m.sender].griffin += 1
                            global.db.data.users[m.sender].anakgriffin -= (griffin * 100)
                            conn.reply(m.chat, `*Selamat Pet Griffin kamu naik level*`, m)
                        }
                    }
                } else m.reply(`Makanan pet kamu tidak cukup`)
            } else m.reply(`Pet kamu sudah kenyang, coba kasih makan *${waktug}* lagi`)
            break
        case 'naga':
            if (naga == 0) return m.reply('*Kamu belum memiliki Pet Naga*')
            if (naga == 5) return m.reply('*Pet kamu dah lvl max*')
            let ___waktuuu = (new Date - global.db.data.users[m.sender].nagalastclaim)
            let ____waktuuu = (600000 - ___waktuuu)
            let waktuuu = clockString(____waktuuu)
            if (new Date - global.db.data.users[m.sender].nagalastclaim > 600000) {
                if (global.db.data.users[m.sender].makananpet > 0) {
                    global.db.data.users[m.sender].makananpet -= 1
                    global.db.data.users[m.sender].anaknaga += 20
                    global.db.data.users[m.sender].nagalastclaim = new Date * 1
                    conn.reply(m.chat, `Berhasil memberi makan pet ${type}`, m)
                    if (naga > 0) {
                        let naiklvl = ((naga * 100) - 1)
                        if (global.db.data.users[m.sender].anaknaga > naiklvl) {
                            global.db.data.users[m.sender].naga += 1
                            global.db.data.users[m.sender].anaknaga -= (naga * 100)
                            conn.reply(m.chat, `*Selamat Pet Naga kamu naik level*`, m)
                        }
                    }
                } else m.reply(`Makanan pet kamu tidak cukup`)
            } else m.reply(`Pet kamu sudah kenyang, coba kasih makan *${waktuuu}* lagi`)
            break
            case 'rubah':
            if (rubah == 0) return m.reply('*Kamu belum memiliki Pet rubah*')
            if (rubah == 5) return m.reply('*Pet kamu dah lvl max*')
            let __waktuu = (new Date - global.db.data.users[m.sender].rubahlastclaim)
            let _waktuu = (600000 - __waktuu)
            let waktuu = clockString(_waktuu)
            if (new Date - global.db.data.users[m.sender].rubahlastclaim > 600000) {
                if (global.db.data.users[m.sender].makananpet > 0) {
                    global.db.data.users[m.sender].makananpet -= 1
                    global.db.data.users[m.sender].anakrubah += 20
                    global.db.data.users[m.sender].rubahlastclaim = new Date * 1
                    conn.reply(m.chat, `Berhasil memberi makan pet ${type}`, m)
                    if (naga > 0) {
                        let naiklvl = ((rubah * 100) - 1)
                        if (global.db.data.users[m.sender].anakrubah > naiklvl) {
                            global.db.data.users[m.sender].rubah += 1
                            global.db.data.users[m.sender].anakrubah -= (rubah * 100)
                            conn.reply(m.chat, `*Selamat Pet rubah kamu naik level*`, m)
                        }
                    }
                } else m.reply(`Makanan pet kamu tidak cukup`)
            } else m.reply(`Pet kamu sudah kenyang, coba kasih makan *${waktuu}* lagi`)
            break
        case 'kucing':
            if (kucing == 0) return m.reply('*Kamu belum memiliki Pet Kucing*')
            if (kucing == 5) return m.reply('*Pet kamu dah lvl max*')
            let __waktu = (new Date - global.db.data.users[m.sender].kucinglastclaim)
            let _waktu = (600000 - __waktu)
            let waktu = clockString(_waktu)
            if (new Date - global.db.data.users[m.sender].kucinglastclaim > 600000) {
                if (global.db.data.users[m.sender].makananpet > 0) {
                    global.db.data.users[m.sender].makananpet -= 1
                    global.db.data.users[m.sender].anakkucing += 20
                    global.db.data.users[m.sender].kucinglastclaim = new Date * 1
                    conn.reply(m.chat, `Berhasil memberi makan pet ${type}`, m)
                    if (kucing > 0) { 
                        let naiklvl = ((kucing * 100) - 1)
                        if (global.db.data.users[m.sender].anakkucing > naiklvl) {
                            global.db.data.users[m.sender].kucing += 1
                            global.db.data.users[m.sender].anakkucing -= (kucing * 100)
                            conn.reply(m.chat, `*Selamat Pet Kucing kamu naik level*`, m)
                        }
                    }
                } else m.reply(`Makanan pet kamu tidak cukup`)
            } else m.reply(`Pet kamu sudah kenyang, coba kasih makan *${waktu}* lagi`)
            break
        default:
            return conn.reply(m.chat, `${usedPrefix}feed [kucing | phonix | kuda | naga | serigala | kyubi | centaur | griffin | anjing]\nContoh penggunaan: *${usedPrefix}feed kucing*`, m)
    }
}
handler.help = ['feed [pet type]']
handler.tags = ['rpg']
handler.command = /^(feed(ing)?)$/i
handler.rpg = true
handler.group = true

module.exports = handler

function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  console.log({ms,h,m,s})
  return [h, m, s].map(v => v.toString().padStart(2, 0) ).join(':')
}