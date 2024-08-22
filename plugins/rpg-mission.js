let { promises, readFileSync } = require('fs');
let misi = JSON.parse(readFileSync('./lib/misi.json'));

async function handler(m, { conn, args, text, usedPrefix, command }) {
    conn.mission = conn.mission ? conn.mission : {};
    if (m.sender in conn.mission) return conn.reply(m.chat, "Kamu masih melakukan misi, tunggu sampai selesai!!", m);

    try {
        let json = misi[Math.floor(Math.random() * misi.length)]; // Mendapatkan misi secara acak
        const cooldown = 5 * (1000 * 60); // Timer cooldown dalam milidetik
        let user = global.db.data.users[m.sender]; // Mendapatkan data pengguna dari database
        
        if (user.health == 0) return conn.reply(m.chat, `Stamina Anda kurang dari 100`, m);
        
        // Ensure properties are properly initialized
        if (typeof user.lastmisi != "number") global.db.data.users[m.sender].lastmisi = 0;
        if (typeof user.exp != "number") global.db.data.users[m.sender].exp = 0;
        if (typeof user.crystal != "number") global.db.data.users[m.sender].crystal = 0;
        if (!Array.isArray(user.title)) user.title = [];

        let timers = (cooldown - (new Date - user.lastmisi));
        if (new Date - user.lastmisi <= cooldown) return m.reply(`Tunggu 🕐${clockString(timers)}`);
        if (!user.skill) return conn.reply(m.chat, "Anda belum memiliki skill", m);

        if (!(m.sender in conn.mission)) {
            conn.mission[m.sender] = {
                sender: m.sender,
                timeout: setTimeout(() => { m.reply('Waktu habis'); delete conn.mission[m.sender]; }, 60000),
                json
            };

            let caption = `*MISI TELAH DIBERIKAN KEPADA PEMAIN!*
*🥇 PERINGKAT:* ${json.rank}
*📰 MISI:* ${json.misii}
*🎁 HADIAH:* Exp ${json.exp} & Kristal ${json.crystal}
${ json.title ? `*🔖 JUDUL:* ${json.title}` : '\n'} ${json.gems ? `Batu permata: ${json.gems}` : `\n`}

Pilih opsi
- Terima
- Batalkan`;

            return conn.reply(m.chat, caption, m); // Mengirimkan pesan misi
        }
    } catch (e) {
        console.error(e);
        if (m.sender in conn.mission) {
            let { timeout } = conn.mission[m.sender];
            clearTimeout(timeout);
            delete conn.mission[m.sender];
            conn.reply(m.chat, 'Terjadi kesalahan saat mengambil misi (Rejected)\n' + e.message, m);
        }
    }
}

handler.before = async m => {
    conn.mission = conn.mission ? conn.mission : {};
    if (!(m.sender in conn.mission)) return;
    if (m.isBaileys) return;

    try {
        let { timeout, json } = conn.mission[m.sender];
        const cooldown = 5 * (1000 * 60); // Timer cooldown dalam milidetik
        let user = global.db.data.users[m.sender]; // Mendapatkan data pengguna dari database

        // Ensure properties are properly initialized
        if (typeof user.lastmisi != "number") global.db.data.users[m.sender].lastmisi = 0;
        if (typeof user.exp != "number") global.db.data.users[m.sender].exp = 0;
        if (typeof user.crystal != "number") global.db.data.users[m.sender].crystal = 0;
        if (!Array.isArray(user.title)) user.title = [];

        let timers = (cooldown - (new Date - user.lastmisi));
        if (new Date - user.lastmisi <= cooldown) return m.reply(`Tunggu 🕐${clockString(timers)}`);
        if (!user.skill) return m.reply("Anda belum memiliki skill");

        let txt = (m.msg && m.msg.selectedDisplayText ? m.msg.selectedDisplayText : m.text ? m.text : '').toLowerCase();
        if (txt != "terima" && txt != "batalkan") return;

        let randomaku = `${Math.floor(Math.random() * 101)}`.trim();
        let randomkamu = `${Math.floor(Math.random() * 81)}`.trim();
        let Aku = (randomaku * 1);
        let Kamu = (randomkamu * 1);
        let aud = ["Mana Habis", "Stamina Habis", "Diserang Monster", "Dibokong Monster"];
        let aui = aud[Math.floor(Math.random() * aud.length)];

        if (/^terima?$/i.test(txt)) {
            if (Aku > Kamu) {
                var cpt = `Berhasil Menyelesaikan 📰misi ${json.misii}`;
                conn.reply(m.chat, `${json.title ? `Anda mendapat judul ${json.title}` : ""}`, m);
                conn.reply(m.chat, cpt, m);
                user.exp += json.exp;
                user.crystal += json.crystal;
                if (json.title) user.title.push(json.title);
                user.misi += json.misii;
            } else {
                var flr = `Gagal Menyelesaikan 📰Misi ${json.misii} karena ${aui}`;
                conn.reply(m.chat, flr, m);
            }
            user.lastmisi = new Date * 1;
            clearTimeout(timeout);
            delete conn.mission[m.sender];
            return true;
        } else if (/^batalkan?$/i.test(txt)) {
            clearTimeout(timeout);
            delete conn.mission[m.sender];
            conn.reply(m.chat, 'Dibatalkan', m);
            return true;
        }
    } catch (e) {
        console.error(e);
        let { timeout } = conn.mission[m.sender];
        clearTimeout(timeout);
        delete conn.mission[m.sender];
        conn.reply(m.chat, 'Terjadi kesalahan saat menyelesaikan misi (Rejected)\n' + e.message, m);
    }
}

handler.help = ['mission'];
handler.tags = ['rpg'];
handler.command = /^(m(isi)?(ission)?)$/i;

module.exports = handler;

/**
 * Deteksi apakah itu angka
 * @param {Number} x
 * @returns Boolean
 */
function number(x = 0) {
    x = parseInt(x);
    return !isNaN(x) && typeof x == 'number';
}

/**
 * Pilih secara acak dari array
 * @param {Array} list
 * @returns Any
 */
function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}

/**
 * Konversi milidetik ke string jam
 * @param {Number} ms
 * @returns String
 */
function clockString(ms) {
    let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000);
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24;
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
    return ['\n' + d, ' *Hari ☀️*\n ', h, ' *Jam 🕐*\n ', m, ' *Menit ⏰*\n ', s, ' *Detik ⏱️* '].map(v => v.toString().padStart(2, 0)).join('');
}